const express = require('express');
const jwtController = require('../API/jwt/jwt_controller');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const multer = require('multer')
const upload = multer({ dest: 'public/images/places/' })

// router.use('/', (req,res, next) => {
//     jwtController.authenticateAccessToken(req, res, next)
// })

const isUserLoggedIn = async (req, res, next) => {
    const { cookies } = req
    const { uid } = cookies
    if (uid) {
        req.user = await userService.getUserById(uid)
        next()
        return
    }
    next()

}

router.get('/', isUserLoggedIn, async (req, res) => {
    await placeController.getPlaces(req, res)
});

router.post('/', upload.single('img'), (req, res) => {
    placeController.addPlace(req, res)
})

router.delete('/', (req, res) => {
    placeController.deleteAll(req, res)
})

router.patch('/:id/visit-count', (req, res) => {
    placeController.incrementVisitCount(req, res)
})

router.patch('/:id/status', (req, res) => {
    placeController.setStatus(req, res)
}),

    router.patch('/:id/note', (req, res) => {
        placeController.updateNote(req, res)
    })

// router.delete('/', (req, res) => {
//     Place.deleteMany().exec().then(() => {
//         res.json('All places deleted successfully')
//     }).catch((err) => {
//         res.json({
//             error: err
//         })
//     })
// })
//
// router.post('/', (req, res, next) => {
//     const place = new Place({
//         _id: new mongoose.Types.ObjectId,
//         name: req.body.name,
//         address: req.body.address,
//         type: req.body.type,
//         lat: req.body.lat,
//         lng: req.body.lng,
//         description: req.body.description,
//         status: req.body.status,
//         subtitle: req.body.subtitle,
//         openingHours: req.body.openingHours,
//         phone: req.body.phone,
//         img: req.body.img,
//         email: req.body.email,
//         website: req.body.website
//     })
//
//     place.save().then((result) => {
//         console.log(result)
//         res.status(201).json({
//             message: 'New place added successfully.',
//             createdPlace: place
//         })
//     }).catch(error => {
//         console.log(error)
//         res.json({
//             error: error
//         })
//     })
// })

module.exports = router;