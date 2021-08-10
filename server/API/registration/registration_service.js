const userService = require('../user/user_service')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const confirmationEmail = require('../confirmation/confirmation_email')

const registrationService = {

    async sendConfirmationEmail(user) {
        const token = await confirmationTokenService.createToken(user['_id'])
        await confirmationEmail.send(user.firstName, user.email, token.value)
        return token
    },

    async registerUser(userData){
        const user = await userService.addUser(userData)
        return this.sendConfirmationEmail(user)
    },

    async resendConfirmationEmail(userEmail){
        const user = await userService.getUserByEmail(userEmail)
        return this.sendConfirmationEmail(user)
    }


}

module.exports = registrationService