const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const multer = require('multer');
const validatePlace = require('../API/place/validation/place_validator');
const { body, validationResult, cookie, sanitizeBody } = require('express-validator');
const validatePlaceAddress = require('../API/place/validation/place_validator');
const ApiError = require('../errors/ApiError')
const fileUpload = require('express-fileupload')
const path = require('path')


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


const validateUploadedImage = (req, res, next) => {
    console.log(req.files)
    if (Object.keys(req.files).length !== 1) return next(ApiError.badRequest('One image file is required and only one is allowed.'))
    if (!req.files.img) return next(ApiError.badRequest('Image file not found in uploaded form.'))
    const image = req.files.img
    console.log(image.mimetype)
    if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') return next(ApiError.badRequest((`Invalid file type. Accepted file types: png, jpg, jpeg`)))
    next()
}


router.post('/',
    fileUpload({
        safeFileNames: true,
        limits: { fileSize: 500000 },
        abortOnLimit: true
    }),
    validateUploadedImage,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 30 }),
    body('subtitle').isString().isLength({ min: 1, max: 50 }),
    body('description').isString().isLength({ min: 1, max: 250 }),
    body('phone').isMobilePhone().notEmpty(),
    body('email').isEmail(),
    body('website').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] }),
    body('facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('lat').isFloat().notEmpty(),
    body('lng').isFloat().notEmpty(),
    (req, res, next) => {
        console.log(req.files)
        console.log(req.body)
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) return next(ApiError.badRequest(errors.array())) 
        placeController.addPlace(req, res, next)
    }
)
router.delete('/', (req, res, next) => {
    placeController.deleteAll(req, res, next)
})

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