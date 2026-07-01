const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner.controller');
const authenticate = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role');

// GET /api/owner/dashboard
router.get(
  '/dashboard',
  authenticate,
  authorizeRoles(['OWNER']),
  ownerController.getDashboard
);

module.exports = router;
