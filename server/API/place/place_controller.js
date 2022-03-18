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

    async addLocations(req, res, next) {
        try {
            const { id } = req.params
            const { locations } = req.body
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            const place = await placeService.addLocations(user, id, locations)
            return res.status(200).json(placeDto({ ...place._doc }, uid))


        } catch (err) {
            return next(err)
        }

    },

    async setSelectedLocationsAlwaysOpen(req, res, next) {
        try {
            const { id } = req.params
            const { locationIds } = req.body
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            await placeService.setSelectedLocationsAlwaysOpen(user, id, locationIds)
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    },

    async getPlacesWithUnwindedLocations(req, res, next) {
        try {
            const { start, limit } = req.query
            const places = await placeService.getPlacesWithUnwindedLocations(parseInt(start), parseInt(limit))
            return res.status(200).json(places[0])
        } catch (err) {
            return next(err)
        }
    },

    async changeOpeningHoursForSelectedLocations(req, res, next) {
        try {
            const { id } = req.params
            const { locationIds, openingHours } = req.body
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            await placeService.changeOpeningHoursForSelectedLocations(user, id, locationIds, openingHours)
            return res.status(200).json()
        } catch (err) {
            return next(err)
        }

    },

    async changeContactDetailsForLocations(req, res, next) {
        try {
            console.log('helou')
            const { id } = req.params
            const { locationIds, contactDetails } = req.body
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            await placeService.changeContactDetailsForLocations(user, id, locationIds, contactDetails)
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }

    },


    deleteLocations: async (req, res, next) => {
        try {
            const { placeId } = req.params
            const { locationIds } = req.body
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            await placeService.deleteLocations(user, placeId, locationIds)
            return res.status(200).json()
        } catch (err) {
            return next(err)
        }
    },

    setAlwaysOpen: async (req, res, next) => {
        try {
            const { alwaysOpen } = req.body
            const { id } = req.params
            await placeService.setAlwaysOpen(alwaysOpen, id)
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    },

    async getActivePlacesByAddressAndName(req, res, next) {
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
    },

    async getActivePlacesBySingleProperty(req, res, next) {
        const { start, limit } = req.query
        let param = Object.keys(req.query)[0]
        const paramValue = req.query[param].trim()
        if (param == 'address') param = 'locations.address'
        let searchObj = {}
        searchObj[param] = new RegExp(paramValue, 'i')
        try {
            let places
            param === 'uid' ?
                places = await placeService.getActivePlacesByUserId(req.query['uid'])
                :
                places = await placeService.getActivePlacesBy(searchObj, start, limit)
            return res.status(200).json(places[0])
        } catch (err) {
            return next(err)
        }
    },

    async getAllActivePlaces(req, res, next) {
        const { start, limit } = req.query
        try {
            const places = await placeService.getActivePlaces(start, limit)
            return res.status(200).json(places[0])
        } catch (err) {
            return next(err)
        }
    },

    async getActivePlacesByParams(req, res, next, paramCount) {
        const { start, limit } = req.query
        const searchObj = {}
        console.log(paramCount)
        for (let i = 0; i < paramCount; i++) {
            let param = Object.keys(req.query)[i]
            if (param === 'start' || param === 'limit') continue
            const paramValue = req.query[param].trim()
            if (param == 'address') param = 'locations.address'
            searchObj[param] = new RegExp(paramValue, 'i')
        }
        try {
            places = await placeService.getActivePlacesBy(searchObj, start, limit)
            return res.status(200).json(places[0])
        } catch (err) {
            return next(err)
        }
    },

    async getActivePlacesPaginated(req, res, next) {
        const queryLength = Object.keys(req.query).length
        if (queryLength > 5) throw ApiError.badRequest('Invalid query param count')
        return this.getActivePlacesByParams(req, res, next, queryLength)
    },

    async getActivePlaces(req, res, next) {
        const queryLength = Object.keys(req.query).length
        switch (queryLength) {
            //when looking for places with two params 
            case 2:
                return this.getActivePlacesByAddressAndName(req, res, next)
            //when looking for places with single param
            case 1:
                return this.getActivePlacesBySingleProperty(req, res, next)
            case 0:
                return this.getAllActivePlaces(req, res, next)
            default:
                return next(ApiError.badRequest('Invalid request'))
        }
    },

    findPlaceNamesOrTypes: async (req, res, next) => {
        const { inputValue } = req.query
        if (!inputValue) throw ApiError.badRequest('Input value is required')
        const searchParam = new RegExp(inputValue, 'i')
        try {
            let places = []
            const foundNames = await placeService.getPlaceNames(searchParam)
            if (foundNames.length > 0) {
                for (const name of foundNames) {
                    places.push({
                        name: name,
                        foundBy: 'name'
                    })
                }
            }
            const foundTypes = await placeService.getPlaceTypes(searchParam)
            if (foundTypes.length > 0) {
                for (const type of foundTypes) {
                    places.push({
                        name: type,
                        foundBy: 'type'
                    })
                }
            }
            return res.status(200).json(places)
        } catch (err) {
            return next(err)
        }

    },

    getVisitsNewsOpinionsForPlace: async (place, uid) => {
        for (const location of place.locations) {
            const [visits, opinions, news] = await Promise.all([
                // visitService.getVisitsByLocationId(place._id, location._id, uid),
                opinionService.getOpinionsBy({ locationId: location._id }),
                // newsService.getNewsBy({ locationId: location._id }),
            ])
            // location.visits = visits && visits.map(visit => visitDto(visit))
            location.opinions = opinions.map(opinion => opinionDto(opinion))
            // location.news = news.map(news => newsDto(news))
        }
        return place
    },
    getSubscribedPlaces: async (req, res, next) => {
        const { uid } = req.cookies
        const { start, limit } = req.query
        try {
            let locationIds = await userService.getSubscribedLocationIds(uid)
            const searchObj = { 'locations._id': {$in: locationIds} }
            console.log(searchObj)
            const places = await placeService.getActivePlacesBy(searchObj, start, limit)
            return res.status(200).json(places[0])
        } catch (err) {
            return next(err)
        }
    },

    getVisitsNewsOpinions: async (places, uid) => {
        const subscribedLocations = uid && await userService.getSubscribedLocations(uid)
        places = await Promise.all(places.map(async (place) => {
            place.locations.forEach(loc => {
                loc['isUserSubscriber'] = subscribedLocations && subscribedLocations.some(location => location._id.toString() === loc._id.toString())
            })
            return placeController.getVisitsNewsOpinionsForPlace(place, uid)
        }))
        return places
    },

    async getStatus(req, res, next) {
        try {
            const { locationId } = req.params
            const statusData = await placeService.getStatus(locationId)
            return res.status(200).json(statusData.status[0])
        } catch (err) {
            return next(err)
        }
    },

    async getPlaceById(req, res, next) {
        try {
            const { uid } = req.cookies
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('Invalid uid')
            const { id } = req.params
            let place = await placeService.getPlaceOwnedByUser(id, uid)
            // place = await this.getVisitsNewsOpinionsForPlace(place, uid)
            return res.status(200).json(placeDto(place, uid))
        } catch (err) {
            return next(err)
        }
    },

    async getPlaceByIdAndSelectedLocation(req, res, next) {
        try {
            const { uid } = req.cookies
            const { placeId, locationId } = req.params
            let place = await placeService.getPlaceByIdAndSelectedLocation(placeId, locationId )
            return res.status(200).json(placeDto(place, uid))
        } catch (err) {
            return next(err)
        }
    },

    getPlaces: async (req, res, next) => {
        const queryLength = Object.keys(req.query).length
        const { cookies } = req
        const { uid } = cookies
        console.log(uid)
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

    addPlace: async (req, res, next) => {
        const { cookies } = req
        const { uid } = cookies
        const reqBody = req.body
        try {
            const user = await userService.getUserById(uid)
            if (!user) throw ApiError.internal('User with provided uid not found')
            const { logo, images } = req.files
            if (!reqBody.editionMode) {
                if (!logo) throw ApiError.badRequest('Request is missing necessary upload files')
                if (logo.length !== 1) throw ApiError.badRequest('Exactly one logo file is required')
            }
            const placeData = {
                name: reqBody.name,
                type: reqBody.type,
                description: reqBody.description,
                subtitle: reqBody.subtitle,
                logo: logo ? logo[0] : null,
                images: images,
                locations: reqBody.locations,
                userId: user._id,
            }
            placeData.isBusinessChain = JSON.parse(reqBody.isBusinessChain)
            let place
            if (reqBody.editionMode) {
                placeData['_id'] = reqBody._id
                place = await placeService.editPlace(placeData, user)
            } else {
                place = await placeService.addPlace(placeData)
            }
            return res.status(201).json(placeDto({ ...place._doc }, uid))
        } catch (err) {
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

    getMatchParams(req) {
        const { type, name, address } = req.query
        const matchParams = {}
        if (name) matchParams['name'] = new RegExp(name, 'i')
        if (address) matchParams['locations.address'] = new RegExp(address, 'i')
        if (type) matchParams['type'] = new RegExp(type, 'i')
        return matchParams
    },


    async getPlacesBySortParam(req, res, next, sortParam) {
        const { start, limit } = req.query
        const matchParams = this.getMatchParams(req)
        try {
            let places = await placeService.getPlacesPaginatedSortedBy(
                parseInt(start),
                parseInt(limit),
                sortParam,
                matchParams
            )
            return res.status(200).json(places[0])
        } catch (err) {
            next(err)
        }

    },

    async getRecentlyAddedPlaces(req, res, next) {
        const sortParam = { createdAt: -1 }
        this.getPlacesBySortParam(req, res, next, sortParam)
    },

    async getFavoritePlaces(req, res, next) {
        const matchParams = this.getMatchParams(req)
        const { start, limit } = req.query
        let { favIds } = req.cookies
        if (!favIds) return res.status(200).json([])
        favIds = favIds.split(',')
        try {
            const places = await placeService.getFavoritePlaces(
                parseInt(start),
                parseInt(limit),
                favIds,
                matchParams
            )
            return res.status(200).json(places[0])
        } catch (err) {
            next(err)
        }
    },

    async getTopRatedPlaces(req, res, next) {
        const sortParam = { 'locations.averageNote.average': -1 }
        this.getPlacesBySortParam(req, res, next, sortParam)
    },


    async getPopularPlaces(req, res, next) {
        const sortParam = { 'locations.visitCount': -1 }
        this.getPlacesBySortParam(req, res, next, sortParam)
    },

    getOpeningHours: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const data = await placeService.getOpeningHours(locationId)
            if (data.openingHours.length > 0) {
                delete data.openingHours[0]['_id']
            }

            return res.status(200).json({
                openingHours: data.openingHours[0],
                alwaysOpen: data.alwaysOpen[0],
                isActive: data.isActive[0]
            })
        } catch (err) {
            return next(err)
        }
    },

    getAverageNote: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const data = await placeService.getAverageNote(locationId)

            return res.status(200).json(data.averageNote[0])
        } catch (err) {
            return next(err)
        }

    },

    setStatus: async (req, res, next) => {
        try {
            const { id } = req.params
            const { status } = req.body
            await placeService.setStatus(id, status)
            return res.status(200).json()
        } catch (err) {
            next(err)
        }
    },

    setOpeningHours: async (req, res, next) => {
        const { id } = req.params
        const { openingHours } = req.body
        try {

            const place = await placeService.setOpeningHours(id, openingHours)
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