const express=require('express')
const router = express.Router()
const confirmationController = require('../API/confirmation/confirmation_controller')

router.get('/:tokenValue', (req, res) => {
    confirmationController.confirmRegistration(req, res)
})

module.exports = router