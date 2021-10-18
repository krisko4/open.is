const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const userService = require('../user/user_service')


const confirmationService = {

    confirmRegistration: async(tokenValue) => {
        const userId = await confirmationTokenService.confirmToken(tokenValue)
        await userService.activateUser(userId)
        return confirmationTokenService.deleteAllTokensForUser(userId)
    },
    confirmEmailChange: async(tokenValue, email) => {
        const userId = await confirmationTokenService.confirmToken(tokenValue)
        await userService.changeEmail(userId, email)
        console.log('wbita byla')
        return confirmationTokenService.deleteAllTokensForUser(userId)

    }
}

module.exports = confirmationService