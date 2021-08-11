const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')

router.get('/', (req, res, next) => {
  jwtController.authenticateAccessToken(req, res)
})

module.exports = router