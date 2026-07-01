const prisma = require('../config/db');
const ApiResponse = require('../utils/response');

class OwnerController {
  async getDashboard(req, res, next) {
    try {
      const store = await prisma.store.findUnique({
        where: { ownerId: req.user.id },
        include: {
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
      });

      if (!store) {
        return ApiResponse.error(res, 'No store found for this owner.', 404);
      }

      const ratings = store.ratings;
      const averageRating =
        ratings.length > 0
          ? parseFloat(
              (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            )
          : 0;

      const ratingsList = ratings.map((r) => ({
        id: r.id,
        userName: r.user.name,
        userEmail: r.user.email,
        rating: r.rating,
        createdAt: r.createdAt,
      }));

      return ApiResponse.success(
        res,
        {
          store: {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
            createdAt: store.createdAt,
          },
          averageRating,
          totalRatings: ratings.length,
          ratings: ratingsList,
        },
        'Owner dashboard retrieved successfully.'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OwnerController();
