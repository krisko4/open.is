const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')

router.get('/',  async(req, res, next) => {
   await jwtController.authenticateAccessToken(req, res, next)
})

module.exports = router