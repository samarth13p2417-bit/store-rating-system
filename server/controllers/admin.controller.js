const prisma = require('../config/db');
const userService = require('../services/user.service');
const storeService = require('../services/store.service');
const ApiResponse = require('../utils/response');

class AdminController {
  async getDashboard(req, res, next) {
    try {
      const [totalUsers, totalStores, totalRatings] = await Promise.all([
        prisma.user.count(),
        prisma.store.count(),
        prisma.rating.count(),
      ]);

      return ApiResponse.success(res, {
        totalUsers,
        totalStores,
        totalRatings,
      }, 'Dashboard data retrieved successfully.');
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return ApiResponse.success(res, user, 'User created successfully.', 201);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { users, total } = await userService.getAllUsers(req.query);
      const { page = 1, limit = 10 } = req.query;
      return ApiResponse.paginated(res, users, total, page, limit, 'Users retrieved successfully.');
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      return ApiResponse.success(res, user, 'User retrieved successfully.');
    } catch (error) {
      next(error);
    }
  }

  async createStore(req, res, next) {
    try {
      const store = await storeService.createStore(req.body);
      return ApiResponse.success(res, store, 'Store created successfully.', 201);
    } catch (error) {
      next(error);
    }
  }

  async getStores(req, res, next) {
    try {
      const { stores, total } = await storeService.getAllStores(req.query);
      const { page = 1, limit = 10 } = req.query;
      return ApiResponse.paginated(res, stores, total, page, limit, 'Stores retrieved successfully.');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
