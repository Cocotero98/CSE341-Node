const routes = require('express').Router();
const validate = require('../middleware/validation');
const { validationResult } = require('express-validator');
let errors;

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAll);

routes.get('/:id', contactsController.getSingle);

routes.post(
  '/add',
  validate.contactValidation,
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  },
  contactsController.addContact
);

routes.put(
  '/update/:id',
  validate.contactValidation,
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  },
  contactsController.updateContact
);

routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;
