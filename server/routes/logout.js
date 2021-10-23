const express = require('express')
const router = express.Router()
const loginController = require('../API/login/login_controller')

router.get('/', async (req, res, next) => {
    await loginController.logout(req, res, next)
})

module.exports = router