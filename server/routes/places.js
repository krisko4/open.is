const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const { body, param, validationResult, cookie } = require('express-validator');
const ApiError = require('../errors/ApiError')
const jwtController = require('../API/jwt/jwt_controller')
const placeValidator = require('../request_validators/place_validator')
const imageValidator = require('../request_validators/image_validator')
const validateRequest = require('../request_validators/express_validator')
const multer = require('multer')
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
router.get('/active/name', (req, res, next) => {
    placeController.findPlaceNames(req, res, next)
})

router.get('/active/favorite', (req, res, next) => {
    placeController.getFavoritePlaces(req, res, next)
})

router.get('/active',
    (req, res, next) => {
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



const parseLocations = (req, res, next) => {
    console.log(req.body.locations)
    req.body.locations = JSON.parse(req.body.locations)
    next()
}

router.post('/',
    jwtController.authenticateAccessToken,
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
    parseLocations,
    placeValidator.validatePlaceAddress,
    // imageValidator.validateUploadedImages,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 50 }),
    body('subtitle').isString().isLength({ min: 1, max: 100 }),
    body('description').isString().isLength({ min: 1, max: 600 }),
    body('locations.*.phone').isMobilePhone().notEmpty(),
    body('locations.*.email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('locations.*.website').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] }),
    body('locations.*.facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('locations.*.instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('locations.*.lat').isFloat().notEmpty(),
    body('locations.*.lng').isFloat().notEmpty(),
    validateRequest,
    (req, res, next) => {
        console.log(req.files)
        placeController.addPlace(req, res, next)
    }
)

router.get('/active/subscribed',
    cookie('uid').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        placeController.getSubscribedPlaces(req, res, next)
    })

// router.delete('/', (req, res, next) => {
//     placeController.deleteAll(req, res, next)
// })

router.delete('/:placeId', (req, res, next) => {
    placeController.deletePlace(req, res, next)
})

router.delete('/:placeId/locations/:locationId',
    cookie('uid').notEmpty().isMongoId(),
    param('placeId').notEmpty().isMongoId(),
    param('locationId').notEmpty().isMongoId(),
    (req, res, next) => {
        placeController.deleteLocation(req, res, next)
    }

)


router.put('/',
    // fileUpload({
    //     safeFileNames: true,
    //     limits: { fileSize: 500000 },
    //     abortOnLimit: true,
    //     useTempFiles: true,
    //     tempFileDir: '/tmp/'

    // }),
    jwtController.authenticateAccessToken,
    body('address').isString().notEmpty(),
    placeValidator.validatePlaceAddress,
    imageValidator.validateImageOnEdit,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 50 }),
    body('subtitle').isString().isLength({ min: 1, max: 100 }),
    body('description').isString().isLength({ min: 1, max: 600 }),
    body('phone').isMobilePhone().notEmpty(),
    body('email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('website').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] }),
    body('facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('lat').isFloat().notEmpty(),
    body('lng').isFloat().notEmpty(),
    validateRequest,
    (req, res, next) => {
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

router.patch('/:id/opening-hours',
    body('openingHours').notEmpty(),
    body('openingHours.*.start').notEmpty().isISO8601(),
    body('openingHours.*.end').notEmpty().isISO8601(),
    body('openingHours.*.open').isBoolean(),
    validateRequest,
    (req, res, next) => {
        placeController.setOpeningHours(req, res, next)
    })

router.patch('/:id/always-open',
    param('id').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.setAlwaysOpen(req, res, next)
    })

module.exports = router;