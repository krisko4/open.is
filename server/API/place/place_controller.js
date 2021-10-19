const placeService = require('./place_service')
const userService = require('../user/user_service')
const placeDto = require('./model/place_dto')
const ApiError = require('../../errors/ApiError')
const visitService = require('../visit/visit_service')
const visitDto = require('../visit/model/visit_dto')
const opinionService = require('../opinion/opinion_service')
const opinionDto = require('../opinion/model/opinion_dto')
const newsService = require('../news/news_service')
const newsDto = require('../news/model/news_dto')

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
                    return res.status(200).json(places.map(place => placeDto({...place._doc}, uid)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                return placeService.getActivePlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto({...place._doc}, uid))))
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
                return res.status(200).json(place ? placeDto(place._doc, uid) : null)
            case 1:
                const param = Object.keys(req.query)[0]
                let searchObj = {}
                searchObj[param] = new RegExp(req.query[param], 'i')
                console.log(searchObj)
                try {
                    let places
                    if (param === 'uid') {
                        places = await placeService.getPlacesByUserId(req.query['uid'])
                        const objPlaces = await Promise.all(places.map(async (place) => {
                            const placeObject = { ...place._doc }
                            const visits = await visitService.getVisitsByPlaceId(placeObject._id)
                            placeObject.visits = visits.map(visit => visitDto(visit))
                            const opinions = await opinionService.getOpinionsBy({ placeId: placeObject._id })
                            placeObject.opinions = opinions.map(opinion => opinionDto(opinion))
                            const news = await newsService.getNewsBy({ placeId: placeObject._id })
                            placeObject.news = news.map(news => newsDto(news))
                            return placeObject
                        }))
                        places = objPlaces
                        console.log(places)
                        return res.status(200).json(places.map(place => placeDto(place, uid)))
                    } else {
                        places = await placeService.getPlacesBy(searchObj)
                        return res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid)))
                    }
                } catch (err) {
                    return next(err)
                }
            case 0:
                return placeService.getPlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid))))
                    .catch(err => next(err))

            default:
                return next(ApiError.badRequest('Invalid request'))
        }
    },



    editPlace: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        const reqBody = req.body
        try {
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('User with provided uid not found')
            // let img = req.files && req.files.img
            // if (!img) img = req.body.img
            const placeData = {
                _id: reqBody._id,
                name: reqBody.name,
                address: reqBody.address,
                type: reqBody.type,
                lat: reqBody.lat,
                lng: reqBody.lng,
                description: reqBody.description,
                subtitle: reqBody.subtitle,
                phone: reqBody.phone,
                email: reqBody.email,
                website: reqBody.website,
                userId: user._id,
                facebook: reqBody.facebook,
                instagram: reqBody.instagram
            }
            const {img} = req.files
            if(img) placeData.img = img
            const place = await placeService.editPlace(placeData, user)
            const placeObject = { ...place._doc }
            const visits = await visitService.getVisitsByPlaceId(placeObject._id)
            placeObject.visits = visits.map(visit => visitDto(visit))
            const opinions = await opinionService.getOpinionsBy({ placeId: placeObject._id })
            placeObject.opinions = opinions.map(opinion => opinionDto(opinion))
            const news = await newsService.getNewsBy({ placeId: placeObject._id })
            placeObject.news = news.map(news => newsDto(news))
            return res.status(200).json({ message: 'Place updated successfully.', place: placeDto(placeObject, uid) })
        }
        catch (err) {
            return next(err)
        }


    },

    deletePlace: async (req, res, next) => {
        const { placeId } = req.params
        try {
            await placeService.deletePlace(placeId)
            await opinionService.deleteOpinionsByPlaceId(placeId)
            await visitService.deleteVisitsByPlaceId(placeId)
            await newsService.deleteNewsByPlaceId(placeId)

            return res.sendStatus(200)
        }catch(err){
            return next(err)
        }
        
    },

    addPlace: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        const reqBody = req.body
        try {
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('User with provided uid not found')
            const { img } = req.files
            if(!img) throw ApiError.badRequest('Image file is required')
            console.log(img)
            const placeData = {
                name: reqBody.name,
                address: reqBody.address,
                type: reqBody.type,
                lat: reqBody.lat,
                lng: reqBody.lng,
                description: reqBody.description,
                subtitle: reqBody.subtitle,
                phone: reqBody.phone,
                img: img,
                email: reqBody.email,
                website: reqBody.website,
                userId: user._id,
                facebook: reqBody.facebook,
                instagram: reqBody.instagram
            }
            const place = await placeService.addPlace(placeData)
            return res.status(201).json({ message: 'New place added successfully.', place: placeDto({ ...place._doc }, uid) })
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
            return res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid)))
        } catch (err) {
            next(err)
        }

    },


    getTopRatedPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            const places = await placeService.getTop20PlacesSortedBy({ 'averageNote.average': -1 })
            return res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid)))
        } catch (err) {
            next(err)
        }
    },


    getPopularPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            const places = await placeService.getTop20PlacesSortedBy({ visitCount: -1 })
            return res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid)))
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
            const place = await placeService.setOpeningHours(id, req.body)
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
