const express = require('express')
const router = express.Router()
const loginController = require('../API/login/login_controller')
const {body, validationResult } = require('express-validator');

router.post('/',
    body('email').isEmail().notEmpty(),
    body('password').isStrongPassword().notEmpty(),
    async (req, res, next) => {
        await loginController.login(req, res, next)
    })

module.exports = router