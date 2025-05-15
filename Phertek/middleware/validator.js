const { body } = require('express-validator');

exports.validateUser = [
  body('email')
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail()
    .trim()
    .escape(),
  body('password')
    .isLength({ min: 8, max: 64 }).withMessage('Password must be 8–64 characters')
    .trim()
];

exports.validateEvent = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim()
    .escape(),
  body('location')
    .notEmpty().withMessage('Location is required')
    .trim()
    .escape(),
  body('category')
    .trim()
    .escape()
    .isIn(['Music', 'Art', 'Tech', 'Health']).withMessage('Invalid category'),
  body('start')
    .isISO8601().withMessage('Invalid start date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Start date must be after today');
      }
      return true;
    }),
  body('end')
    .isISO8601().withMessage('Invalid end date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start)) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

exports.validateRSVP = [
  body('status')
    .isIn(['YES', 'NO', 'MAYBE']).withMessage('Invalid RSVP status')
];
