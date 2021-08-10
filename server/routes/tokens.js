const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')

router.post('/', async (req, res) => {
   await jwtController.refreshAccessToken(req, res)
})

router.get('/', async (req, res) => {
    await jwtController.getTokens(req, res)
})

module.exports=router