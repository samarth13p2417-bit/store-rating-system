const { body } = require('express-validator');

const createUserValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 20 })
    .withMessage('Name must be at least 20 characters long.')
    .isLength({ max: 60 })
    .withMessage('Name must not exceed 60 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .isLength({ max: 16 })
    .withMessage('Password must not exceed 16 characters.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character.'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required.')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters.'),
  body('role')
    .notEmpty()
    .withMessage('Role is required.')
    .isIn(['ADMIN', 'USER', 'OWNER'])
    .withMessage('Role must be one of: ADMIN, USER, OWNER.'),
];

module.exports = {
  createUserValidator,
};
