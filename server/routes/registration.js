const express = require('express');
const registrationController = require("../API/registration/registration_controller");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit')
const validateRequest = require('../request_validators/express_validator')

const registrationLimiter = rateLimit({
    windowMs: 60* 60 * 1000, // 5 minutes
    skipFailedRequests: true,
    max: 5,
    message: 'You have already registered 5 accounts in the last hour. Please try again later 🙃'

})

router.post('/',
    registrationLimiter,
    body('firstName').notEmpty().isString().isLength({ max: 20 }).not().equals('chuj'),
    body('lastName').notEmpty().isString().isLength({ max: 30 }),
    body('password').isStrongPassword().notEmpty(),
    body('email').isEmail().notEmpty(),
    validateRequest,
    (req, res, next) => {
        registrationController.registerUser(req, res, next)
    })

router.post('/resend-email',
    body('email').isEmail().notEmpty(),
    validateRequest,
     (req, res, next) => {
        registrationController.resendConfirmationEmail(req, res, next)
    })

module.exports = router