const express = require('express')
const router = express.Router()
const { body, validationResult, cookie } = require('express-validator');
const contactController = require('../API/contact/contact_controller')
const validateRequest = require('../request_validators/express_validator')

router.post('/',
    body('name').isString().notEmpty().isLength({ max: 40 }),
    body('email').isEmail().notEmpty(),
    body('content').isString().isLength({ max: 400 }),
    validateRequest,
    (req, res, next) => {
        contactController.sendMessage(req, res, next)
    })

module.exports = router