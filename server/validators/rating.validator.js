const { body } = require('express-validator');

const createRatingValidator = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
  body('storeId')
    .notEmpty()
    .withMessage('Store ID is required.')
    .isInt({ min: 1 })
    .withMessage('Store ID must be a valid integer.'),
];

const updateRatingValidator = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
];

module.exports = {
  createRatingValidator,
  updateRatingValidator,
};
