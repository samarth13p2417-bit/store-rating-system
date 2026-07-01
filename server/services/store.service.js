const prisma = require('../config/db');

class StoreService {
  async createStore(storeData) {
    const { name, email, address, ownerId } = storeData;

    // Verify the owner exists and has OWNER role
    const owner = await prisma.user.findUnique({
      where: { id: parseInt(ownerId) },
      include: { store: true },
    });

    if (!owner) {
      const error = new Error('Owner not found.');
      error.statusCode = 404;
      throw error;
    }

    if (owner.role !== 'OWNER') {
      const error = new Error('The specified user does not have the OWNER role.');
      error.statusCode = 400;
      throw error;
    }

    if (owner.store) {
      const error = new Error('This owner already has a store assigned.');
      error.statusCode = 409;
      throw error;
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId: parseInt(ownerId),
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return store;
  }

  async getAllStores(query) {
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

    const allowedSortFields = ['name', 'email', 'address', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const order = sortOrder === 'desc' ? 'desc' : 'asc';

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
          ],
        }
      : {};

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          ratings: true,
        },
        orderBy: { [sortField]: order },
        skip,
        take: limitNum,
      }),
      prisma.store.count({ where }),
    ]);

    // Compute average rating for each store
    const storesWithRatings = stores.map((store) => {
      const ratings = store.ratings;
      const averageRating =
        ratings.length > 0
          ? parseFloat(
              (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            )
          : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        ownerId: store.ownerId,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
        owner: store.owner,
        averageRating,
        ratingCount: ratings.length,
      };
    });

    return { stores: storesWithRatings, total };
  }

  async getStoresByUser(query, userId) {
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

    const allowedSortFields = ['name', 'email', 'address', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const order = sortOrder === 'desc' ? 'desc' : 'asc';

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
          ],
        }
      : {};

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          ratings: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { [sortField]: order },
        skip,
        take: limitNum,
      }),
      prisma.store.count({ where }),
    ]);

    // Compute average rating and include current user's rating for each store
    const storesWithRatings = stores.map((store) => {
      const ratings = store.ratings;
      const averageRating =
        ratings.length > 0
          ? parseFloat(
              (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            )
          : 0;

      // Find the current user's rating for this store
      const userRating = ratings.find((r) => r.userId === userId);

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        ownerId: store.ownerId,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
        owner: store.owner,
        averageRating,
        ratingCount: ratings.length,
        userRating: userRating
          ? {
              id: userRating.id,
              rating: userRating.rating,
            }
          : null,
      };
    });

    return { stores: storesWithRatings, total };
  }
}

module.exports = new StoreService();
