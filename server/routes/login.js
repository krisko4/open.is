const express = require('express')
const router = express.Router()
const loginController = require('../API/login/login_controller')
const {body} = require('express-validator');
const validateRequest = require('../request_validators/express_validator')

router.post('/',
    body('email').isEmail().notEmpty(),
    body('password').isStrongPassword().notEmpty(),
    validateRequest,
    (req, res, next) => {
       loginController.login(req, res, next)
    })

module.exports = router