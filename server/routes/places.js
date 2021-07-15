const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Place = require('../models/place')


/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.query.name) {
        Place.find({name: new RegExp(req.query.name, 'i')}).exec().then((docs => {
            res.json(docs)
        })).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
        return
    }
    if (req.query.address) {
        Place.find({address: new RegExp(req.query.address, 'i')}).exec().then((docs => {
            res.json(docs)
        })).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
        return
    }
    Place.find().exec().then((docs => {
        res.json(docs)
    })).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     const name = req.query.name
//     Place.find({name: name}).exec().then((docs => {
//         res.json(docs)
//     })).catch(err => {
//         console.log(err)
//         res.status(500).json({
//             error: err
//         })
//     })
// });


router.delete('/', (req, res) => {
    Place.deleteMany().exec().then(() => {
        res.json('All places deleted successfully')
    }).catch((err) => {
        res.json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        lat: req.body.lat,
        lng: req.body.lng,
        description: req.body.description,
        status: req.body.status,
        openingHours: req.body.openingHours
    })

    place.save().then((result) => {
        console.log(result)
        res.status(201).json({
            message: 'Handling POST request to /users',
            createdPlace: place
        })
    }).catch(error => {
        console.log(error)
        res.status(400).json({
            message: error
        })
    })
})

module.exports = router;