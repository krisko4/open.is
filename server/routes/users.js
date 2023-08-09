const express = require('express');
const multer = require('multer')
const router = express.Router();
const userController = require('../API/user/user_controller')
const jwtController = require('../API/jwt/jwt_controller')
const { body, cookie, validationResult, param } = require('express-validator');
const validateRequest = require('../request_validators/express_validator')

const upload = multer(
    {
        dest: '/tmp/',
        limits: {
            fileSize: 2000000
        },
        fileFilter: function (req, file, callback) {
            console.log(file)
            const mimetype = file.mimetype
            if (!mimetype.startsWith('image/')) {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        },
    })

router.patch('/:id/profile-picture',
    jwtController.authenticateAccessToken,
    upload.single('img'),
    param('id').isMongoId().notEmpty(),
    cookie('uid').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        userController.updateProfilePicture(req, res, next)
    }
)

router.delete('/:id/profile-picture',
    jwtController.authenticateAccessToken,
    param('id').isMongoId().notEmpty(),
    cookie('uid').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        userController.removeProfilePicture(req, res, next)
    }
)
router.patch('/:id',
    jwtController.authenticateAccessToken,
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
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


router.delete(`/:id/subscriptions/:locationId`,
    param('id').notEmpty().isMongoId(),
    param('locationId').notEmpty().isMongoId(),
    cookie('uid').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        userController.removeSubscription(req, res, next)
    })

router.get(`/:id/subscriptions/:locationId`,
    param('id').notEmpty().isMongoId(),
    param('locationId').notEmpty().isMongoId(),
    cookie('uid').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        userController.checkIfUserIsSubscriber(req, res, next)
    })

router.post('/:id/subscriptions',
    param('id').notEmpty().isMongoId(),
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
