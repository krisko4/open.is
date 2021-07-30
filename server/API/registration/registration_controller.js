const userService = require('../user/user_service')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')

const registrationController = {

    registerUser: async (req, res) => {
        const userData = req.body
        try {
            const user = await userService.addUser(userData)
            const token = await confirmationTokenService.createToken(user['_id'])
            res.json(token)
        } catch (err) {
            res.status(400).json({error: err})
        }


    }

}

module.exports = registrationController