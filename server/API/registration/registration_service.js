const userService = require('../user/user_service')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const emailService = require('../email/email_service')
const mongoose = require('mongoose')
const ApiError = require('../../errors/ApiError')

const registrationService = {

    async sendConfirmationEmail(user, session) {
        const token = await confirmationTokenService.createToken(user['_id'], session)
        await emailService.sendConfirmationEmail(user.firstName, user.email, token.value)
        return token
    },

    async registerUser(userData) {
        const session = await mongoose.startSession()
        let token
        await session.withTransaction(async () => {
            const user = await userService.addUser(userData, session)
            token = await this.sendConfirmationEmail(user, session)
        })
        await session.endSession()
        return token
    },

    async resendConfirmationEmail(userEmail) {
        const user = await userService.getUserByEmail(userEmail)
        if(!user) throw ApiError.internal(`User with e-mail ${email} not found`)
        return this.sendConfirmationEmail(user)
    }


}

module.exports = registrationService