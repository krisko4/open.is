const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const userService = require('../user/user_service')


const confirmationService = {

    confirmRegistration: async(tokenValue) => {
        console.log('witam')
        const userId = await confirmationTokenService.confirmToken(tokenValue)
        await userService.activateUser(userId)
        return confirmationTokenService.deleteAllTokensForUser(userId)
    }
}

module.exports = confirmationService