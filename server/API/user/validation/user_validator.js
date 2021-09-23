
const EMAIL_ERROR_MSG = 'E-mails are different.'
const PASSWORD_ERROR_MSG = 'Passwords are different.'
const ApiError = require('../../../errors/ApiError')

const userValidator = {
    checkEmailPasswordEquality: (req, res, next) => {
        const {email, password, confirmEmail, confirmPassword} = req.body
        if(email !== confirmEmail || password !== confirmPassword) return email !== confirmEmail ? next(ApiError.badRequest(EMAIL_ERROR_MSG)) : next(ApiError.badRequest(PASSWORD_ERROR_MSG))
        return next()
    }
}

module.exports = userValidator