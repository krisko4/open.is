const express = require('express');
const registrationController = require("../API/registration/registration_controller");
const router = express.Router();


router.post('/', async(req, res) => {
    await registrationController.registerUser(req, res)
})

router.post('/resend-email', async(req,res) => {
    await registrationController.resendConfirmationEmail(req, res)
})

module.exports = router