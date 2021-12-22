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
const mongoose = require('mongoose')

const placeController = {


    getActivePlaces: async (req, res, next) => {
        const queryLength = Object.keys(req.query).length
        const { cookies } = req
        const { uid } = cookies
        switch (queryLength) {
            case 2:
                const { name, address } = req.query
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
                let param = Object.keys(req.query)[0]
                const paramValue = req.query[param]
                if(param == 'address') param = 'locations.address'
                let searchObj = {}
                searchObj[param] = new RegExp(paramValue, 'i')
                console.log(searchObj)
                try {
                    let places
                    param === 'uid' ? places = await placeService.getActivePlacesByUserId(req.query['uid']) : places = await placeService.getActivePlacesBy(searchObj)
                    return res.status(200).json(places.map(place => placeDto(place, uid)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                return placeService.getActivePlaces()
                    .then(places => res.status(200).json(places.map(place => placeDto({ ...place._doc }, uid))))
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


    getVisitsNewsOpinions: async (place, uid) => {
        for (const location of place.locations) {
            const [visits, opinions, news] = await Promise.all([
                visitService.getVisitsByLocationId(place._id, location._id, uid),
                opinionService.getOpinionsBy({ locationId: location._id }),
                newsService.getNewsBy({ locationId: location._id })
            ])
            location.visits = visits.map(visit => visitDto(visit))
            location.opinions = opinions.map(opinion => opinionDto(opinion))
            location.news = news.map(news => newsDto(news))
        }
        return place
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
                try {
                    let places
                    if (param === 'uid') {
                        places = await placeService.getPlacesByUserId(req.query['uid'])
                        places = await Promise.all(places.map(async (place) => {
                            return placeController.getVisitsNewsOpinions(place, uid)
                        }))
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
            const img = req.files && req.files.img
            if (img) placeData.img = img
            const place = await placeService.editPlace(placeData, user)
            place = placeController.getVisitsNewsOpinions(place)
            // const placeObject = { ...place._doc }
            // for (const location of placeObject.locations) {
            //     const [visits, opinions, news] = await Promise.all([
            //         visitService.getVisitsByLocationId(placeObject._id, location._id, uid),
            //         opinionService.getOpinionsBy({ locationId: location._id }),
            //         newsService.getNewsBy({ locationId: location._id })
            //     ])
            //     location.visits = visits.map(visit => visitDto(visit))
            //     location.opinions = opinions.map(opinion => opinionDto(opinion))
            //     location.news = news.map(news => newsDto(news))
            // }
            return res.status(200).json({ message: 'Place updated successfully.', place: placeDto(place, uid) })
        }
        catch (err) {
            return next(err)
        }


    },

    deletePlace: async (req, res, next) => {
        const { placeId } = req.params
        try {
            const session = await mongoose.startSession()
            await session.withTransaction(async () => {
                await Promise.all([
                    placeService.deletePlace(placeId),
                    opinionService.deleteOpinionsByPlaceId(placeId),
                    visitService.deleteVisitsByPlaceId(placeId),
                    newsService.deleteNewsByPlaceId(placeId)
                ])
            })
            await session.endSession()
            return res.sendStatus(200)
        } catch (err) {
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
            if (!img) throw ApiError.badRequest('Image file is required')
            const placeData = {
                name: reqBody.name,
                type: reqBody.type,
                description: reqBody.description,
                subtitle: reqBody.subtitle,
                img: img,
                locations: reqBody.locations,
                userId: user._id,
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
            let places = await placeService.getTop20PlacesSortedBy({ createdAt: -1 })
            places = await Promise.all(places.map(async (place) => {
                return placeController.getVisitsNewsOpinions(place, uid)
            }))
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }

    },

    getFavoritePlaces: async (req, res, next) => {
        const { cookies } = req
        let { uid, favIds } = cookies
        if (!favIds) return res.status(200).json([])
        favIds = favIds.split(',')
        try {
            let places = await placeService.getFavoritePlaces(favIds)
            places = await Promise.all(places.map(async (place) => {
                return placeController.getVisitsNewsOpinions(place, uid)
            }))
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }


    },


    getTopRatedPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            let places = await placeService.getTop20PlacesSortedBy({ 'locations.averageNote.average': -1 })
            places = await Promise.all(places.map(async (place) => {
                return placeController.getVisitsNewsOpinions(place, uid)
            }))
            return res.status(200).json(places.map(place => placeDto(place, uid)))
        } catch (err) {
            next(err)
        }
    },


    getPopularPlaces: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        try {
            let places = await placeService.getTop20PlacesSortedBy({ 'locations.visitCount': -1 })
            places = await Promise.all(places.map(async (place) => {
                return placeController.getVisitsNewsOpinions(place, uid)
            }))
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
