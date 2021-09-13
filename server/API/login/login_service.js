const userService = require('../user/user_service')
const jwtService = require('../jwt/jwt_service')


const loginService = {
    login: async(userData) => {
        const user = await userService.validateLoggedUser(userData)
        const accessToken =  await jwtService.generateAccessToken(user)
        const refreshToken = await jwtService.generateRefreshToken(user)
        await jwtService.saveRefreshToken(refreshToken, user)
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            uid: user._id,
            fullName: `${user.firstName} ${user.lastName}`
        }
    },

    logout: async (uid) => {
        const user = await userService.getUserById(uid)
        if(!user) throw `User with id ${uid} not found.`
        await jwtService.deleteRefreshTokensForUser(user)
    }
}

module.exports = loginService