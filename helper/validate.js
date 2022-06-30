const { validationResult } = require('express-validator');

const validationHandler = (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {        
        return res.render('web/default', { pageTitle: "Validation",status: false, message: result.errors[0].msg});
    }
    return next();
}
module.exports = {
    validationHandler: validationHandler
}