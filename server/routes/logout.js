const express = require('express')
const router = express.Router()
const loginController = require('../API/login/login_controller')

router.get('/', async (req, res) => {
    await loginController.logout(req, res)
})

module.exports = router