const jwtService = require('./jwt_service')
const { addDays } = require('date-fns')
const jwtController = {

    async refreshAccessToken(req, res, next) {
        const { cookies } = req
        const refreshToken = cookies['refresh_token']
        if (!refreshToken) return res.sendStatus(401)
        try {
            const accessToken = await jwtService.refreshAccessToken(refreshToken)
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
             return res.sendStatus(200)
        } catch (err) {
            return res.sendStatus(403)
        }
    },
    async authenticateAccessToken(req, res, next) {
        const { cookies } = req
        let accessToken = cookies['access_token']
        if (!accessToken) return res.sendStatus(401)   
        try {
            jwtService.authenticateAccessToken(accessToken)
            return res.sendStatus(200)
        } catch (err) {
            if (err.name === 'TokenExpiredError') return await this.refreshAccessToken(req, res, next)
            return res.sendStatus(403)
        }
    },
    getTokens: async (req, res) => {
        try {
            const tokens = await jwtService.getTokens()
            res.status(200).json(tokens)
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}

module.exports = jwtController