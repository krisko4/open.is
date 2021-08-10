const express=require('express')
const router = express.Router()
const confirmationController = require('../API/confirmation/confirmation_controller')

router.get('/:tokenValue', async (req, res) => {
    await confirmationController.confirmRegistration(req, res)
})


module.exports = router