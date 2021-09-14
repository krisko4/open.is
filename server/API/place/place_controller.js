const placeService = require('./place_service')
const userService = require('../user/user_service')
const placeDto = require('./model/place_dto')

const placeController = {


    getActivePlaces: async (req, res) => {
        const queryLength = Object.keys(req.query).length
        switch (queryLength) {
            case 1:
                const param = Object.keys(req.query)[0]
                let searchObj = {}
                searchObj[param] = new RegExp(req.query[param], 'i')
                console.log(searchObj)
                try {
                    let places
                    if (param === 'uid') {
                        places = await placeService.getActivePlacesByUserId(req.query['uid'])
                    } else {
                        places = await placeService.getActivePlacesBy(searchObj)
                    }
                    return res.status(200).json(places.map(place => placeDto(place, req.user)))
                } catch (err) {
                    console.log(err)
                    return res.status(400).json({ error: 'Invalid request' })
                }    
            case 0:
                return placeService.getActivePlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto(place, req.user))))
                    .catch(err => res.json({ error: err }))
                    
            default:
                return res.status(400).json({
                    error: 'Invalid request'
                })
        }
    },

    getPlaces : async (req, res) => {
        const queryLength = Object.keys(req.query).length
        switch (queryLength) {
            case 1:
                const param = Object.keys(req.query)[0]
                let searchObj = {}
                searchObj[param] = new RegExp(req.query[param], 'i')
                console.log(searchObj)
                try {
                    let places
                    if (param === 'uid') {
                        places = await placeService.getPlacesByUserId(req.query['uid'])
                    } else {
                        places = await placeService.getPlacesBy(searchObj)
                    }
                    return res.status(200).json(places.map(place => placeDto(place, req.user)))
                } catch (err) {
                    console.log(err)
                    return res.status(400).json({ error: 'Invalid request' })
                }    
            case 0:
                return placeService.getPlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto(place, req.user))))
                    .catch(err => res.json({ error: err }))
                    
            default:
                return res.status(400).json({
                    error: 'Invalid request'
                })
        }
    },



    addPlace: async (req, res) => {
        const { cookies } = req
        try {
            const user = await userService.getUserByEmail(cookies.email)
            if (!user) throw new Error(`User with email ${cookies.email} not found!`)
            const placeData = {
                name: req.body.name,
                address: req.body.address,
                type: req.body.type,
                lat: req.body.lat,
                lng: req.body.lng,
                description: req.body.description,
                subtitle: req.body.subtitle,
                openingHours: req.body.openingHours,
                phone: req.body.phone,
                img: req.file.filename,
                email: req.body.email,
                website: req.body.website,
                userId: user._id
            }
            const place = await placeService.addPlace(placeData)
            if (place) res.status(201).json({ message: 'New place added successfully.', place })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ error: err })
        }
    },

    deleteAll: async (req, res) => {
        try {
            await placeService.deleteAll()
            res.sendStatus(200)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    incrementVisitCount: async (req, res) => {
        try {
            const { id } = req.params
            await placeService.incrementVisitCount(id)
            res.sendStatus(200)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    setStatus: async (req, res) => {
        try {
            const { id } = req.params
            const status = req.body.status
            console.log(status)
           // if (status !== 'open' && status !== 'closed') return res.status(400).json({ error: 'Invalid request' })
            await placeService.setStatus(id, status)
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    setOpeningHours: async (req, res) => {
        const {id} = req.params
        console.log(req.body)
        if(Object.keys(req.body).length === 0) return res.status(400).json('Request body is missing')
        try {
            const place = await placeService.setOpeningHours(id, req.body)
            return res.status(200).json(place)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    updateNote: async (req, res) => {
        try {
            const { id } = req.params
            console.log(id)
            const { note } = req.body
            const place = await placeService.updateNote(note, id)
            return res.status(200).json(place)
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    }


}

module.exports = placeController

// router.get('/', function (req, res) {
//
//     const queryLength = Object.keys(req.query).length
//     if(queryLength > 1){
//         res.status(400).json( {
//             error: 'Invalid request'
//         })
//         return
//     }
//     if(queryLength === 1){
//         const param = Object.keys(req.query)[0]
//         let searchObj = {}
//         searchObj[param] =  new RegExp('^' + req.query[param], 'i')
//         Place.find(searchObj).exec().then((docs => {
//             res.json(docs)
//             console.log(docs)
//         })).catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         })
//         return
//     }
//     // Place.find().exec().then((docs => {
//     //     res.json(docs)
//     // })).catch(err => {
//     //     console.log(err)
//     //     res.status(500).json({
//     //         error: err
//     //     })
//     // })
//     PlaceServiceInstance.getUsers()
//         .then(users => users)
//         .catch(err => res.status(500).json({error: err}))
// });
//
//
//
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
//
// module.exports = router;