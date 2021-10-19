const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const { body, validationResult, cookie, sanitizeBody } = require('express-validator');
const ApiError = require('../errors/ApiError')
const fileUpload = require('express-fileupload');
const jwtController = require('../API/jwt/jwt_controller')
const placeValidator = require('../request_validators/place_validator')
const imageValidator = require('../request_validators/image_validator')



router.get('/active/name', (req, res, next) => {
    placeController.findPlaceNames(req, res, next)
})

router.get('/active', (req, res, next) => {
    placeController.getActivePlaces(req, res, next)
})

router.get('/active/popular', (req, res, next) => {
    placeController.getPopularPlaces(req, res, next)
})


router.get('/active/top', (req, res, next) => {
    placeController.getTopRatedPlaces(req, res, next)
})

router.get('/active/new', (req, res, next) => {
    placeController.getRecentlyAddedPlaces(req, res, next)
})

router.get('/', (req, res, next) => {
    placeController.getPlaces(req, res, next)
});




router.post('/',
    jwtController.authenticateAccessToken,
    fileUpload({
        safeFileNames: true,
        limits: { fileSize: 500000 },
        abortOnLimit: true,
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }),
    placeValidator.validatePlaceAddress,
    imageValidator.validateUploadedImage,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 50 }),
    body('subtitle').isString().isLength({ min: 1, max: 100 }),
    body('description').isString().isLength({ min: 1, max: 400 }),
    body('phone').isMobilePhone().notEmpty(),
    body('email').isEmail().optional({nullable: true, checkFalsy: true}),
    body('website').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] }),
    body('facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('lat').isFloat().notEmpty(),
    body('lng').isFloat().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        placeController.addPlace(req, res, next)
    }
)


router.delete('/', (req, res, next) => {
    placeController.deleteAll(req, res, next)
})

router.delete('/:placeId', (req, res, next) => {
    placeController.deletePlace(req, res, next)
})


router.put('/',
    fileUpload({
        safeFileNames: true,
        limits: { fileSize: 500000 },
        abortOnLimit: true,
        useTempFiles: true,
        tempFileDir: '/tmp/'

    }),
    jwtController.authenticateAccessToken,
    body('address').isString().notEmpty(),
    placeValidator.validatePlaceAddress,
    imageValidator.validateImageOnEdit,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 51 }),
    body('subtitle').isString().isLength({ min: 1, max: 101 }),
    body('description').isString().isLength({ min: 1, max: 401 }),
    body('phone').isMobilePhone().notEmpty(),
    body('email').isEmail().optional({nullable: true, checkFalsy: true}),
    body('website').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] }),
    body('facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('lat').isFloat().notEmpty(),
    body('lng').isFloat().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors.array())
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        placeController.editPlace(req, res, next)
    }
)

router.patch('/:id/visit-count', (req, res, next) => {
    placeController.incrementVisitCount(req, res, next)
})

router.patch('/:id/status', (req, res, next) => {
    placeController.setStatus(req, res, next)
})

router.patch('/:id/note', (req, res, next) => {
    placeController.updateNote(req, res, next)
})

router.patch('/:id/opening-hours', (req, res, next) => {
    placeController.setOpeningHours(req, res, next)
})


module.exports = router;