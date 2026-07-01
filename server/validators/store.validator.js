const { body } = require('express-validator');

const createStoreValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Store name is required.')
    .isLength({ min: 20 })
    .withMessage('Store name must be at least 20 characters long.')
    .isLength({ max: 60 })
    .withMessage('Store name must not exceed 60 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required.')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters.'),
  body('ownerId')
    .notEmpty()
    .withMessage('Owner ID is required.')
    .isInt({ min: 1 })
    .withMessage('Owner ID must be a valid integer.'),
];

module.exports = {
  createStoreValidator,
};
