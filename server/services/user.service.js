const bcrypt = require('bcryptjs');
const prisma = require('../config/db');

class UserService {
  async createUser(userData) {
    const { name, email, password, address, role } = userData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getAllUsers(query) {
    const {
      search = '',
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const allowedSortFields = ['name', 'email', 'address', 'role', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const order = sortOrder === 'desc' ? 'desc' : 'asc';

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
            { role: { equals: search.toUpperCase() === 'ADMIN' || search.toUpperCase() === 'USER' || search.toUpperCase() === 'OWNER' ? search.toUpperCase() : undefined } },
          ].filter((condition) => {
            // Remove undefined role filter
            if (condition.role && condition.role.equals === undefined) return false;
            return true;
          }),
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          store: {
            include: {
              ratings: true,
            },
          },
        },
        orderBy: { [sortField]: order },
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ]);

    // For OWNER users, compute the store's average rating
    const usersWithRatings = users.map((user) => {
      if (user.role === 'OWNER' && user.store) {
        const ratings = user.store.ratings;
        const averageRating =
          ratings.length > 0
            ? parseFloat(
                (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
              )
            : 0;

        return {
          ...user,
          store: {
            id: user.store.id,
            name: user.store.name,
            email: user.store.email,
            address: user.store.address,
            averageRating,
            ratingCount: ratings.length,
          },
        };
      }

      const { store, ...userWithoutStore } = user;
      return userWithoutStore;
    });

    return { users: usersWithRatings, total };
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        store: {
          include: {
            ratings: true,
          },
        },
        ratings: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    // Compute store average rating if user is OWNER
    if (user.role === 'OWNER' && user.store) {
      const ratings = user.store.ratings;
      const averageRating =
        ratings.length > 0
          ? parseFloat(
              (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            )
          : 0;

      user.store = {
        id: user.store.id,
        name: user.store.name,
        email: user.store.email,
        address: user.store.address,
        averageRating,
        ratingCount: ratings.length,
      };
    }

    return user;
  }
}

module.exports = new UserService();
