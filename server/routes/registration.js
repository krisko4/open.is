const express = require('express');
const registrationController = require("../API/registration/registration_controller");
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',
    body('firstName').notEmpty().isString().isLength({ max: 20 }),
    body('lastName').notEmpty().isString().isLength({ max: 30 }),
    body('password').isStrongPassword().notEmpty(),
    body('email').isEmail().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors.array())
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        registrationController.registerUser(req, res, next)
    })

router.post('/resend-email', async (req, res, next) => {
    await registrationController.resendConfirmationEmail(req, res, next)
})

module.exports = router