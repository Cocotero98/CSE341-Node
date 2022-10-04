const { check } = require('express-validator');

exports.contactValidation = [
  check('firstName', 'Name is requied').not().isEmpty(),
  check('firstName', 'Please, enter a valid value').isString(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('lastName', 'Please, enter a valid value').isString(),
  check('email', 'Please, include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('favoriteColor', 'Favorite color is required').not().isEmpty(),
  check('favoriteColor', 'Please, enter a valid value').isString(),
  check('birthday', 'Please, enter a valid value').isString()
];
