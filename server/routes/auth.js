const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')

router.get('/', jwtController.authenticateAccessToken, (req, res, next) => {
  res.sendStatus(200)
})

module.exports = router