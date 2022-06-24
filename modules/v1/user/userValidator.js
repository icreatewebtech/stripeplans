const { check,body } = require('express-validator');
const userValidator = {};

userValidator.validateUser = () => {
    return [body('email','invalid email').isEmail()];
}

userValidator.matchPassword = () => {
    let data = [
        check('password').isLength({ min: 8, max:32 }).withMessage('Password must be 8 to 32 char long'),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
            }
            // Indicates the success of this synchronous custom validator
            return data;
        }),
    ];
    return data;
};


module.exports = userValidator;