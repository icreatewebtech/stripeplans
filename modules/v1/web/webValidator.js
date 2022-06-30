const { check } = require('express-validator');
const webValidator = {};
/* form validation */
webValidator.validateFormData = () => {
    let data = [
    check('name').not().isEmpty().trim().escape().withMessage('Name must be required.'),
    check('email').notEmpty().withMessage('Email must be required.').isEmail().withMessage('Invalid email.'),
    check('country').isLength({min:2,max:2}).withMessage('Country code invalid').isAlpha().withMessage('Alphabet Only'),
    check('state').not().isEmpty().trim().escape().withMessage('State must be required.'),
    check('city').not().isEmpty().trim().escape().withMessage('City must be required.'),
    check('phone').isLength({min:10,max:10}).withMessage('Phone must be 10 digit.').isMobilePhone()
  ];
  return data;
}

module.exports = webValidator;