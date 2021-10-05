const express = require('express');
const registrationController = require("../API/registration/registration_controller");
const router = express.Router();
const userValidator = require('../API/user/validation/user_validator')

router.post('/', userValidator.checkEmailPasswordEquality, (req, res, next) => {
    registrationController.registerUser(req, res, next)
})

router.post('/resend-email', async(req, res, next) => {
    await registrationController.resendConfirmationEmail(req, res, next)
})

module.exports = router