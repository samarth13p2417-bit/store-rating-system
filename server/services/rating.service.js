const prisma = require('../config/db');

class RatingService {
  async createRating(ratingData) {
    const { rating, userId, storeId } = ratingData;

    // Check if the store exists
    const store = await prisma.store.findUnique({
      where: { id: parseInt(storeId) },
    });

    if (!store) {
      const error = new Error('Store not found.');
      error.statusCode = 404;
      throw error;
    }

    // Check if user already rated this store
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: parseInt(userId),
        storeId: parseInt(storeId),
      },
    });

    if (existingRating) {
      const error = new Error('You have already rated this store. Use update to change your rating.');
      error.statusCode = 409;
      throw error;
    }

    const newRating = await prisma.rating.create({
      data: {
        rating: parseInt(rating),
        userId: parseInt(userId),
        storeId: parseInt(storeId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return newRating;
  }

  async updateRating(ratingId, rating, userId) {
    const existingRating = await prisma.rating.findUnique({
      where: { id: parseInt(ratingId) },
    });

    if (!existingRating) {
      const error = new Error('Rating not found.');
      error.statusCode = 404;
      throw error;
    }

    if (existingRating.userId !== parseInt(userId)) {
      const error = new Error('You can only update your own ratings.');
      error.statusCode = 403;
      throw error;
    }

    const updatedRating = await prisma.rating.update({
      where: { id: parseInt(ratingId) },
      data: { rating: parseInt(rating) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedRating;
  }
}

module.exports = new RatingService();
