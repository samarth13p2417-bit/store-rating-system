const storeService = require('../services/store.service');
const ApiResponse = require('../utils/response');

class StoreController {
  async getStores(req, res, next) {
    try {
      const { stores, total } = await storeService.getStoresByUser(req.query, req.user.id);
      const { page = 1, limit = 10 } = req.query;
      return ApiResponse.paginated(res, stores, total, page, limit, 'Stores retrieved successfully.');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StoreController();
