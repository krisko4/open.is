const express=require('express')
const router = express.Router()
const confirmationController = require('../API/confirmation/confirmation_controller')

router.get('/:tokenValue', async (req, res, next) => {
    await confirmationController.confirmRegistration(req, res, next)
})


module.exports = router