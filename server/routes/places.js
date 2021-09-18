const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')
const userService = require('../API/user/user_service')
const multer = require('multer')
const upload = multer({ dest: 'public/images/places/' })


// // Check if user is logged in - if so, pass 
// const isUserLoggedIn = async (req, res, next) => {
//     const { cookies } = req
//     const { uid } = cookies
//     try {
//         if (uid) req.user = await userService.getUserById(uid)
//         next()
//     } catch (err) {
//         return res.status(400).json('Invalid uid')
//     }

// }

router.get('/active/name', (req, res) => {
    placeController.findPlaceNames(req, res)
})

router.get('/active', async (req, res) => {
    await placeController.getActivePlaces(req, res)
})

router.get('/active/popular', (req, res) => {
    placeController.getPopularPlaces(req, res)
}),


    router.get('/active/top', (req, res) => {
        placeController.getTopRatedPlaces(req, res)
    }),

    router.get('/active/new', (req, res) => {
        placeController.getRecentlyAddedPlaces(req, res)
    }),

    router.get('/', async (req, res) => {
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
})

router.patch('/:id/note', (req, res) => {
    placeController.updateNote(req, res)
})

router.patch('/:id/opening-hours', (req, res) => {
    placeController.setOpeningHours(req, res)
})


module.exports = router;