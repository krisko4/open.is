const registrationService = require('./registration_service')
const registrationController = {

    registerUser: async (req, res, next) => {
        const {firstName, lastName, password, email, birthdate} = req.body
        try {
            const token = await registrationService.registerUser({
                firstName,
                lastName,
                password,
                email,
                birthdate
            })
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