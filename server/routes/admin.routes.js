const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authenticate = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role');
const validate = require('../middlewares/validate');
const { createUserValidator } = require('../validators/user.validator');
const { createStoreValidator } = require('../validators/store.validator');

// All admin routes require authentication and ADMIN role
router.use(authenticate);
router.use(authorizeRoles(['ADMIN']));

// GET /api/admin/dashboard
router.get('/dashboard', adminController.getDashboard);

// POST /api/admin/users
router.post('/users', createUserValidator, validate, adminController.createUser);

// GET /api/admin/users
router.get('/users', adminController.getUsers);

// GET /api/admin/users/:id
router.get('/users/:id', adminController.getUserById);

// POST /api/admin/stores
router.post('/stores', createStoreValidator, validate, adminController.createStore);

// GET /api/admin/stores
router.get('/stores', adminController.getStores);

module.exports = router;
