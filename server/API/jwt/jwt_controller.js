const jwtService = require('./jwt_service')
const {addDays} = require('date-fns')
const jwtController = {

    async authenticateAccessToken(req, res, next) {
        const {cookies} = req
        const accessToken = cookies['access_token']
        if (!accessToken) return res.sendStatus(401)
        try {
            jwtService.authenticateAccessToken(accessToken)
            next()
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return await this.refreshAccessToken(req, res)
            }
            res.status(403).json({error: err})
        }
    },
    refreshAccessToken: async (req, res) => {
        const {cookies} = req
        const refreshToken = cookies['refresh_token']
        if (!refreshToken) {
            return res.sendStatus(401)
        }
        try {
            const accessToken = await jwtService.refreshAccessToken(refreshToken)
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
             res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.status(403).json({error: err})
        }
    },
    getTokens: async (req, res) => {
        try {
            const tokens = await jwtService.getTokens()
            res.status(200).json(tokens)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}

module.exports = jwtController