const express = require('express');
const router = express.Router();
const userController = require('../API/user/user_controller')
const jwtController = require('../API/jwt/jwt_controller')
const { body, cookie, validationResult, param } = require('express-validator');
const imageValidator = require('../request_validators/image_validator')
const fileUpload = require('express-fileupload');
const validateRequest = require('../request_validators/express_validator')

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
    validateRequest,
    (req, res, next) => {
        userController.changeUserData(req, res, next)
    })

router.get('/:id',
    param('id').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        userController.getUserById(req, res, next)
    })

router.patch('/:id/subscriptions',
    body('locationId').notEmpty().isMongoId(),
    cookie('uid').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        userController.addSubscription(req, res, next)
    })

router.delete('/:id',
    jwtController.authenticateAccessToken,
    param('id').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        userController.deleteUserById(req, res, next)
    })

router.get('/:userId/name', (req, res, next) => {
    userController.getFullNameById(req, res, next)
})

// router.post('/', (req, res, next) => {
//     userController.addUser(req, res, next)
// })


module.exports = router;
