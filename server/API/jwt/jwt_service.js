const jwt = require('jsonwebtoken')
const RefreshToken = require('./model/refresh_token')
const mongoose = require('mongoose')
const INVALID_TOKEN_MSG = 'Token value is invalid.'
const ApiError = require('../../errors/ApiError')
const jwtService = {

    generateAccessToken: (user) => {
        return jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'})
    },

    generateRefreshToken: (user) => {
        return jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET)
    },

    authenticateAccessToken: (token) => {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    },


    deleteRefreshTokensForUser: async (user) => {
        return RefreshToken.deleteMany({userId: user._id}).exec()
    },

    saveRefreshToken: (tokenValue, user) => {
        const refreshToken = new RefreshToken({
            _id: new mongoose.Types.ObjectId,
            value: tokenValue,
            userId: user._id
        })
        return refreshToken.save()
    },

    async refreshAccessToken(refreshToken) {
        const token = await RefreshToken.findOne({value: refreshToken}).exec()
        if (!token) throw ApiError.forbidden(INVALID_TOKEN_MSG)
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (!user) throw ApiError.forbidden(INVALID_TOKEN_MSG)
        return this.generateAccessToken(user)

    },

    // getTokens: () => {
    //     return RefreshToken.find().exec()
    // }


}

module.exports = jwtService