const ratingService = require('../services/rating.service');
const ApiResponse = require('../utils/response');

class RatingController {
  async createRating(req, res, next) {
    try {
      const ratingData = {
        ...req.body,
        userId: req.user.id,
      };
      const rating = await ratingService.createRating(ratingData);
      return ApiResponse.success(res, rating, 'Rating submitted successfully.', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateRating(req, res, next) {
    try {
      const rating = await ratingService.updateRating(
        req.params.id,
        req.body.rating,
        req.user.id
      );
      return ApiResponse.success(res, rating, 'Rating updated successfully.');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RatingController();
