const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const { query, body, param, validationResult, cookie } = require('express-validator');
const ApiError = require('../errors/ApiError')
const jwtController = require('../API/jwt/jwt_controller')
const placeValidator = require('../request_validators/place_validator')
const imageValidator = require('../request_validators/image_validator')
const validateRequest = require('../request_validators/express_validator')
const multer = require('multer')
const upload = multer({
    dest: '/tmp/',
    limits: {
        fileSize: 2000000
    },
    fileFilter: function (req, file, callback) {
        const mimetype = file.mimetype
        if (!mimetype.startsWith('image/')) {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})
router.get('/active/name-or-type', (req, res, next) => {
    placeController.findPlaceNamesOrTypes(req, res, next)
})

router.get('/active/favorite',
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    validateRequest,
    (req, res, next) => {
        placeController.getFavoritePlaces(req, res, next)
    })

router.get('/active',
    (req, res, next) => {
        placeController.getActivePlaces(req, res, next)
    })

router.get('/active/paginated',
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    query('name').isString().optional(),
    query('type').isString().optional(),
    query('address').isString().optional(),
    validateRequest,
    (req, res, next) => {
        placeController.getActivePlacesPaginated(req, res, next)
    })

router.get('/active/popular',
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    query('name').isString().optional(),
    query('type').isString().optional(),
    query('address').isString().optional(),
    validateRequest,
    (req, res, next) => {
        placeController.getPopularPlaces(req, res, next)
    })


router.get('/active/top',
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    query('name').isString().optional(),
    query('type').isString().optional(),
    query('address').isString().optional(),
    validateRequest,
    (req, res, next) => {
        placeController.getTopRatedPlaces(req, res, next)
    })

router.get('/active/new',
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    query('name').isString().optional(),
    query('type').isString().optional(),
    query('address').isString().optional(),
    validateRequest,
    (req, res, next) => {
        placeController.getRecentlyAddedPlaces(req, res, next)
    })

router.get('/', (req, res, next) => {
    placeController.getPlaces(req, res, next)
});

router.get('/:placeId/locations/:locationId',
    param('placeId').isMongoId().notEmpty(),
    param('locationId').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.getPlaceByIdAndSelectedLocation(req, res, next)
    });

router.get('/:id',
    param('id').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.getPlaceById(req, res, next)
    });

const parseLocations = (req, res, next) => {
    req.body.locations = JSON.parse(req.body.locations)
    next()
}

router.post('/',
    jwtController.authenticateAccessToken,
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
    parseLocations,
    body('locations.*.address').notEmpty().isString(),
    body('locations.*.addressId').notEmpty().isString(),
    body('locations.*.addressLanguage').notEmpty().isString(),
    body('isBusinessChain').matches(/^(true|false)$/),
    placeValidator.validatePlaceAddress,
    // imageValidator.validateUploadedImages,
    cookie('uid').notEmpty().isMongoId(),
    body('name').isString().isLength({ min: 2, max: 50 }),
    body('subtitle').isString().isLength({ min: 1, max: 100 }),
    body('description').isString().isLength({ min: 1, max: 600 }),
    body('locations.*.phone').isMobilePhone().notEmpty(),
    body('locations.*.email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('locations.*.website').optional({ nullable: true, checkFalsy: true }).isURL(),
    body('locations.*.facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('locations.*.instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('locations.*.lat').isFloat().notEmpty(),
    body('locations.*.lng').isFloat().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.addPlace(req, res, next)
    }
)

router.get('/active/subscribed',
    cookie('uid').notEmpty().isMongoId(),
    query('start').notEmpty().isFloat({ min: 0 }),
    query('limit').notEmpty().isFloat({ min: 10, max: 50 }),
    validateRequest,
    (req, res, next) => {
        placeController.getSubscribedPlaces(req, res, next)
    })

// router.delete('/', (req, res, next) => {
//     placeController.deleteAll(req, res, next)
// })

router.delete('/:placeId',
    param('placeId').notEmpty().isMongoId(),
    validateRequest,
    (req, res, next) => {
        placeController.deletePlace(req, res, next)
    })

router.delete('/:placeId/locations',
    cookie('uid').notEmpty().isMongoId(),
    param('placeId').notEmpty().isMongoId(),
    body('locationIds.*').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.deleteLocations(req, res, next)
    }

)

router.patch('/:id/locations/always-open',
    param('id').isMongoId().notEmpty(),
    cookie('uid').notEmpty().isMongoId(),
    body('locationIds.*').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.setSelectedLocationsAlwaysOpen(req, res, next)
    }

)

router.get('/:locationId/status',
    param('id').isMongoId().notEmpty(),
    (req, res, next) => {
        placeController.getStatus(req, res, next)
    }
)

router.patch('/:id/locations/opening-hours',
    param('id').isMongoId().notEmpty(),
    cookie('uid').notEmpty().isMongoId(),
    body('locationIds.*').isMongoId().notEmpty(),
    body('openingHours').notEmpty(),
    body('openingHours.*.start').notEmpty().isISO8601(),
    body('openingHours.*.end').notEmpty().isISO8601(),
    body('openingHours.*.open').isBoolean(),
    validateRequest,
    (req, res, next) => {
        placeController.changeOpeningHoursForSelectedLocations(req, res, next)
    }

)

router.get('/test/unwinded', (req, res, next) => {
    placeController.getPlacesWithUnwindedLocations(req, res, next)
})

router.patch('/:id/locations/contact-details',
    param('id').isMongoId().notEmpty(),
    cookie('uid').notEmpty().isMongoId(),
    body('locationIds.*').isMongoId().notEmpty(),
    body('contactDetails.phone').isMobilePhone().optional({ nullable: true, checkFalsy: true }),
    body('contactDetails.email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('contactDetails.website').optional({ nullable: true, checkFalsy: true }).isURL(),
    body('contactDetails.facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('contactDetails.instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    validateRequest,
    (req, res, next) => {
        placeController.changeContactDetailsForLocations(req, res, next)
    }
)

router.patch('/:id/locations',
    param('id').isMongoId().notEmpty(),
    cookie('uid').notEmpty().isMongoId(),
    body('locations.*.phone').isMobilePhone().notEmpty(),
    body('locations.*.email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('locations.*.website').optional({ nullable: true, checkFalsy: true }).isURL(),
    body('locations.*.facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('locations.*.instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('locations.*.lat').isFloat().notEmpty(),
    body('locations.*.lng').isFloat().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.addLocations(req, res, next)
    }
)


router.put('/',
    jwtController.authenticateAccessToken,
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
    parseLocations,
    placeValidator.validatePlaceAddress,
    // imageValidator.validateImageOnEdit,
    cookie('uid').notEmpty().isMongoId(),
    body('_id').isMongoId().notEmpty(),
    body('name').isString().isLength({ min: 2, max: 50 }),
    body('subtitle').isString().isLength({ min: 1, max: 100 }),
    body('description').isString().isLength({ min: 1, max: 600 }),
    body('locations.*.phone').isMobilePhone().notEmpty(),
    body('locations.*.email').isEmail().optional({ nullable: true, checkFalsy: true }),
    body('locations.*.website').optional({ nullable: true, checkFalsy: true }).isURL(),
    body('locations.*.facebook').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['facebook.com'] }),
    body('locations.*.instagram').optional({ nullable: true, checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'], require_host: true, host_whitelist: ['instagram.com'] }),
    body('locations.*.lat').isFloat().notEmpty(),
    body('locations.*.lng').isFloat().notEmpty(),
    validateRequest,
    (req, res, next) => {
        req.body.editionMode = true
        placeController.addPlace(req, res, next)
    }
)

router.patch('/:id/visit-count',
    param('id').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.incrementVisitCount(req, res, next)
    })

router.patch('/:id/status',
    param('id').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {
        placeController.setStatus(req, res, next)
    })

router.get('/:locationId/average-note',
    param('locationId').isMongoId().notEmpty(),
    (req, res, next) => {
        placeController.getAverageNote(req, res, next)
    }
)

router.get('/:locationId/opening-hours',
    param('locationId').isMongoId().notEmpty(),
    (req, res, next) => {
        placeController.getOpeningHours(req, res, next)
    }
)
router.patch('/:id/note',
    param('id').isMongoId().notEmpty(),
    validateRequest,
    (req, res, next) => {

        placeController.updateNote(req, res, next)
    })

router

router.patch('/:id/opening-hours',
    param('id').isMongoId().notEmpty(),
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