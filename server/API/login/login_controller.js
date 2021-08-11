const loginService = require('./login_service')
const { addDays } = require('date-fns')

const loginController = {
    login: async (req, res) => {
        const userData = req.body
        console.log(userData)
        try {
            const { accessToken, refreshToken } = await loginService.login(userData)
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
            res.cookie('email', userData.email, {
                httpOnly: true,
                // secure: true,
                expires: addDays(new Date(), 30)
            })
            res.status(200).json('User logged in successfully.')
        } catch (err) {
            res.status(400).json(err)
        }
    },
    logout: async (req, res) => {
        const { cookies } = req
        const email = cookies['email']
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        res.clearCookie('email')
        if (email) {
            try {
                await loginService.logout(email)
                res.status(200).json('User logged out successfully.')
            } catch (err) {
                res.status(400).json({ error: err })
            }
        }
    }
}

module.exports = loginController