const { check } = require('express-validator');
const webValidator = {};

webValidator.validateFormData = () => {
    let data = [
    check('name').not().isEmpty().trim().escape().withMessage('Name must be required.'),
    check('email').notEmpty().withMessage('Email must be required.').isEmail().withMessage('Invalid email.'),
    check('country').isLength({min:2,max:2}).isAlpha().withMessage('Two Alphabat Code'),
    check('state').not().isEmpty().trim().escape().withMessage('State Must be Required.'),
    check('city').not().isEmpty().trim().escape().withMessage('City Must be Required.'),
    check('phone').isLength({min:10,max:10}).withMessage('Phone must be 10 digit.').isMobilePhone()
  ];
  return data;
}

module.exports = webValidator;