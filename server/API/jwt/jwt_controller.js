const jwtService = require('./jwt_service')
const { addDays } = require('date-fns')
const ApiError = require('../../errors/ApiError')
const jwtController = {

    async refreshAccessToken(req, res, next) {
        const { cookies } = req
        const { refreshToken } = cookies
        try {
            const accessToken = await jwtService.refreshAccessToken(refreshToken)
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
            return next()
        } catch (err) {
            return next(err)
        }
    },

    authenticateAccessToken : async (req, res, next) => {
        const { cookies } = req
        const accessToken = cookies['access_token']
        const refreshToken = cookies['refresh_token']
        if (!accessToken || !refreshToken) return next(ApiError.forbidden('Illegal operation'))
        try {
            jwtService.authenticateAccessToken(accessToken)
            return next()
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                try {
                    const newAccessToken = await jwtService.refreshAccessToken(refreshToken)
                    res.cookie('access_token', newAccessToken, {
                        httpOnly: true,
                        // secure: true,
                        expires: addDays(new Date(), 30)
                    })
                    return next()
                } catch (err) {
                    return next(ApiError.forbidden(err))
                }
            }
            return next(err)
        }
    },

    // getTokens: async (req, res, next) => {
    //     try {
    //         const tokens = await jwtService.getTokens()
    //         res.status(200).json(tokens)
    //     } catch (err) {
    //         return next(err)
    //     }
    // }
}

module.exports = jwtController