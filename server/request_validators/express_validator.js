const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors.array())
    errors.isEmpty() ? next() : next(new Error(errors.array()))
}

module.exports = validateRequest