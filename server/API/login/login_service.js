const userService = require('../user/user_service')
const jwtService = require('../jwt/jwt_service')


const loginService = {
    login: async(userData) => {
        const user = await userService.validateLoggedUser(userData)
        const accessToken =  await jwtService.generateAccessToken(user)
        const refreshToken = await jwtService.generateRefreshToken(user)
        await jwtService.saveRefreshToken(refreshToken, user)
        return {accessToken: accessToken, refreshToken: refreshToken}
    },

    logout: async (email) => {
        const user = await userService.getUserByEmail(email)
        if(!user) throw `User with email ${email} not found.`
        await jwtService.deleteRefreshTokensForUser(user)
    }
}

module.exports = loginService