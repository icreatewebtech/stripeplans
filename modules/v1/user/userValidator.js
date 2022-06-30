const { check } = require('express-validator');
const userValidator = {};

userValidator.validateUser = () => {
    let data = [
        check('email').notEmpty().withMessage('Email must be required.').isEmail().withMessage('Invalid email.'),
        check('password').isLength({ min: 8, max:32 }).withMessage('Password must be 8 to 32 char long'),
      ];
      return data;
}

userValidator.matchPassword = () => {
    let data = [
        check('password').isLength({ min: 8, max:32 }).withMessage('Password must be 8 to 32 char long'),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
            }            
            return data;
        }),
    ];
    return data;
};

userValidator.matchUpdatePassword = () => {
    let data = [
        check('currentPassword').isLength({ min: 8, max:32 }).withMessage('Password must be 8 to 32 char long'),
        check('newPassword').isLength({ min: 8, max:32 }).withMessage('Password must be 8 to 32 char long'),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.newPassword) {
            throw new Error('Password confirmation does not match password');
            }
            return data;
        }),
    ];
    return data;
};
module.exports = userValidator;