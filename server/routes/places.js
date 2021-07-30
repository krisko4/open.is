const express = require('express');
const router = express.Router();
const placeController = require('../API/place/place_controller')


router.get('/', function (req, res) {

    placeController.getPlaces(req, res)
    // const queryLength = Object.keys(req.query).length
    // if(queryLength > 1){
    //     res.status(400).json( {
    //         error: 'Invalid request'
    //     })
    //     return
    // }
    // if(queryLength === 1){
    //     const param = Object.keys(req.query)[0]
    //     let searchObj = {}
    //     searchObj[param] =  new RegExp('^' + req.query[param], 'i')
    //     Place.find(searchObj).exec().then((docs => {
    //         res.json(docs)
    //         console.log(docs)
    //     })).catch(err => {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
    //     return
    // }
    // Place.find().exec().then((docs => {
    //     res.json(docs)
    // })).catch(err => {
    //     console.log(err)
    //     res.status(500).json({
    //         error: err
    //     })
    // })
});

router.post('/', (req, res) => {
    placeController.addPlace(req, res)
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