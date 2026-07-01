const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const authenticate = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role');
const validate = require('../middlewares/validate');
const {
  createRatingValidator,
  updateRatingValidator,
} = require('../validators/rating.validator');

// POST /api/ratings
router.post(
  '/',
  authenticate,
  authorizeRoles(['USER']),
  createRatingValidator,
  validate,
  ratingController.createRating
);

// PUT /api/ratings/:id
router.put(
  '/:id',
  authenticate,
  authorizeRoles(['USER']),
  updateRatingValidator,
  validate,
  ratingController.updateRating
);

module.exports = router;
