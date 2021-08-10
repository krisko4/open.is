const registrationService = require('./registration_service')
const registrationController = {

    registerUser: async (req, res) => {
        const userData = req.body
        console.log(userData)
        try {
            const token = await registrationService.registerUser(userData)
            res.json(token)
        } catch (err) {
            console.log(err)
            res.status(400).json({error: err})
        }
    },

    resendConfirmationEmail: async (req, res) => {
        const userEmail = req.body.email
        console.log(userEmail)
        try {
            const token = await registrationService.resendConfirmationEmail(userEmail)
            res.json(token)
        } catch (err) {
            console.log(err)
            res.status(400).json({error: err})
        }
    }

}

module.exports = registrationController