const { validationResult } = require('express-validator');

const validationHandler = (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(200).json({
            errors: result.array()
        });
    }
    return next();
}

module.exports = {
    validationHandler: validationHandler
}