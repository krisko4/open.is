const express = require('express')
const router = express.Router()
const confirmationTokenController = require('../API/confirmation_token/confirmation_token_controller')

router.get('/', (req,res) => {
    confirmationTokenController.getTokens(req, res)
})

router.delete('/', (req, res) => {
    confirmationTokenController.deleteTokens(req, res)
})



module.exports = router