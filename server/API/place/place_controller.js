const placeService = require('./place_service')
const userService = require('../user/user_service')
const placeDto = require('./model/place_dto')
const ApiError = require('../../errors/ApiError')

const placeController = {


    getActivePlaces: async (req, res, next) => {
        const queryLength = Object.keys(req.query).length
        const { cookies } = req
        const { uid } = cookies
        switch (queryLength) {
            case 2:
                const { name, address } = req.query
                console.log(name, address)
                if (!name || !address) return next(ApiError.badRequest('Invalid request parameters. Required parameters: name, address'))
                const nameRegExp = new RegExp(name, 'i')
                const addressRegExp = new RegExp(address, 'i')
                try {
                    const places = await placeService.getActivePlacesByAddressesAndNames(addressRegExp, nameRegExp)
                    return res.status(200).json(places)
                } catch (err) {
                    return next(err)
                }

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
                    return res.status(200).json(places.map(place => placeDto(place, uid)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                return placeService.getActivePlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto(place, uid))))
                    .catch(err => next(err))

            default:
                return next(ApiError.badRequest('Invalid request'))
        }
    },

    findPlaceNames: async (req, res, next) => {
        const { name } = req.query
        if (!name) return next(ApiError.badRequest('Name is required'))
        try {
            const nameRegex = new RegExp(name, 'i')
            const places = await placeService.getPlaceNames(nameRegex)
            return res.status(200).json(places.map(place => {
                return {
                    name: place.name,
                    foundBy: 'name'
                }
            }))
        } catch (err) {
            return next(err)
        }

    },

    getPlaces: async (req, res, next) => {
        const queryLength = Object.keys(req.query).length
        const { cookies } = req
        const { uid } = cookies
        switch (queryLength) {
            case 2:
                const { lat, lng } = req.query
                if (!lat || !lng) return next(ApiError.badRequest('Invalid request parameters. Required: lat, lng'))
                const place = await placeService.getPlaceByLatLng(lat, lng)
                return res.status(200).json(place)
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
                    return res.status(200).json(places.map(place => placeDto(place, uid)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                return placeService.getPlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto(place, uid))))
                    .catch(err => next(err))

            default:
                return next(ApiError.badRequest('Invalid request'))
        }
    },



    addPlace: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        const reqBody = req.body
        try {
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('User with provided uid not found')
            const duplicateAddress = await placeService.getPlaceByLatLng(reqBody.lat, reqBody.lng)
            if (duplicateAddress) throw ApiError.internal('This address is already occupied by another place')
            const { img } = req.files
            const placeData = {
                name: reqBody.name,
                address: reqBody.address,
                type: reqBody.type,
                lat: reqBody.lat,
                lng: reqBody.lng,
                description: reqBody.description,
                subtitle: reqBody.subtitle,
                phone: reqBody.phone,
                img: img.name,
                email: reqBody.email,
                website: reqBody.website,
                userId: user._id,
                facebook: reqBody.facebook,
                instagram: reqBody.instagram
            }
            const uploadPath = __dirname + '/public/images/places' + img.name
            img.mv(uploadPath, err => {
                if (err) throw ApiError.internal('Image upload failed')
            })
            const place = await placeService.addPlace(placeData)
            return res.status(201).json({ message: 'New place added successfully.', place })
        }
        catch (err) {
            return next(err)
        }

    },



    deleteAll: async (req, res, next) => {
        try {
            await placeService.deleteAll()
            res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    },

    incrementVisitCount: async (req, res, next) => {
        try {
            const { id } = req.params
            await placeService.incrementVisitCount(id)
            res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    },


    getRecentlyAddedPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            const places = await placeService.getTop20PlacesSortedBy({ createdAt: -1 })
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }

    },


    getTopRatedPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            const places = await placeService.getTop20PlacesSortedBy({ 'averageNote.average': -1 })
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }
    },


    getPopularPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            const places = await placeService.getTop20PlacesSortedBy({ visitCount: -1 })
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }
    },

    setStatus: async (req, res, next) => {
        try {
            const { id } = req.params
            const { status } = req.body
            await placeService.setStatus(id, status)
            res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    },

    setOpeningHours: async (req, res, next) => {
        const { id } = req.params
        try {
            if (Object.keys(req.body).length === 0) throw ApiError.badRequest('Request body is missing') 
            const place = await placeService.setOpeningHours(id, reqBody)
            return res.status(200).json(place)
        } catch (err) {
            next(err)
        }
    },

    updateNote: async (req, res, next) => {
        try {
            const { id } = req.params
            const { note } = req.body
            const place = await placeService.updateNote(note, id)
            return res.status(200).json(place)
        } catch (err) {
            next(err)
        }
    }


}

module.exports = placeController
