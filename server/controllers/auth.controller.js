const authService = require('../services/auth.service');
const ApiResponse = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      return ApiResponse.success(res, user, 'User registered successfully.', 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return ApiResponse.success(res, result, 'Login successful.');
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return ApiResponse.success(res, null, 'Logout successful.');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(req.user.id, currentPassword, newPassword);
      return ApiResponse.success(res, null, 'Password changed successfully.');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
