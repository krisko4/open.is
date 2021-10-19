const express = require('express');
const router = express.Router();
const userController = require('../API/user/user_controller')
const jwtController = require('../API/jwt/jwt_controller')
const userValidator = require('../API/user/validation/user_validator')
const { body, validationResult, param } = require('express-validator');
const imageValidator = require('../request_validators/image_validator')
const fileUpload = require('express-fileupload');

router.get('/', (req, res, next) => {
    userController.getUsers(req, res, next)
});

router.delete('/', (req, res, next) => {
    userController.deleteAll(req, res, next)
})

router.patch('/:id',
    jwtController.authenticateAccessToken,
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        safeFileNames: true,
        limits: { fileSize: 500000 },
        abortOnLimit: true,
        debug: true
    }),
    imageValidator.validateImageOnEdit,
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    // body('img').optional({nullable: true, checkFalsy: true}).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['res.cloudinary.com'] }),
    body('password').isStrongPassword().optional({ nullable: true, checkFalsy: true }),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        console.log(req.files)
        userController.changeUserData(req, res, next)
    })

router.get('/:id', (req, res, next) => {
    userController.getUserById(req, res, next)
})

router.delete('/:id',
    jwtController.authenticateAccessToken,
    param('id').notEmpty().isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        userController.deleteUserById(req, res, next)
    })

router.get('/:userId/name', (req, res, next) => {
    userController.getFullNameById(req, res)
})

router.post('/', userValidator.checkEmailPasswordEquality, (req, res, next) => {
    userController.addUser(req, res, next)
})


module.exports = router;
