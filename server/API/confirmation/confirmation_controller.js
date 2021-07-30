const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const userService = require('../user/user_service')
const confirmationController = {
    confirmRegistration: async(req, res) => {
        const tokenValue = req.params['tokenValue']
        try{
            const userId = await confirmationTokenService.confirmToken(tokenValue)
            await userService.activateUser(userId)
            await confirmationTokenService.deleteToken(tokenValue)
            res.status(200).json('Registration confirmed successfully.')
        } catch(err) {
            res.status(400).json({error: err})
        }
    }
}

module.exports = confirmationController