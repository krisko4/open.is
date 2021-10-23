const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')

router.post('/',  (req, res, next) => {
    jwtController.refreshAccessToken(req, res, next)
})

router.get('/',  (req, res, next) => {
    jwtController.getTokens(req, res, next)
})

module.exports=router