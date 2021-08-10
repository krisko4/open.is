const express = require('express')
const router = express.Router()
const loginController = require('../API/login/login_controller')

router.post('/',  async(req, res) => {
    await loginController.login(req, res)
})

module.exports = router