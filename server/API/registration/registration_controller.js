const registrationService = require('./registration_service')
const registrationController = {

    registerUser: async (req, res, next) => {
        const userData = req.body
        console.log(userData)
        try {
            const token = await registrationService.registerUser(userData)
            res.status(200).json(token)
        } catch (err) {
            next(err)
        }
    },

    resendConfirmationEmail: async (req, res, next) => {
        const {email} = req.body
        try {
            const token = await registrationService.resendConfirmationEmail(email)
            res.json(token)
        } catch (err) {
            return next(err)
        }
    }

}

module.exports = registrationController