const express = require('express')
const router = express.Router()
const { body, validationResult, cookie } = require('express-validator');
const contactController = require('../API/contact/contact_controller')


router.post('/',
    body('name').isString().notEmpty().isLength({ max: 40 }),
    body('email').isEmail().notEmpty(),
    body('content').isString().isLength({ max: 400 }),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors.array())
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        contactController.sendMessage(req, res, next)
    })

module.exports = router