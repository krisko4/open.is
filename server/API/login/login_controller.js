const loginService = require('./login_service')
const { addDays } = require('date-fns')

const loginController = {
    login: async (req, res) => {
        const userData = req.body
        console.log(userData)
        try {
            const { accessToken, refreshToken, uid, fullName } = await loginService.login(userData)
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
            res.cookie('uid', uid, {
                httpOnly: true,
                expires: addDays(new Date(), 30)
            })
            res.status(200).json({
                uid: uid,
                fullName: fullName
            })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    logout: async (req, res) => {
        const { cookies } = req
        const uid = cookies['uid']
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        res.clearCookie('email')
        res.clearCookie('uid')
        if (!uid) return res.status(400).json('uid not found in cookies.')
        try {
            await loginService.logout(uid)
            res.status(200).json('User logged out successfully.')
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }
}

module.exports = loginController