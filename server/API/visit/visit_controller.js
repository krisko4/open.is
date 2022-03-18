const visitService = require('./visit_service')
const {visitDto, allVisitsDto} = require('./model/visit_dto')
const ApiError = require('../../errors/ApiError')
const placeService = require('../place/place_service')
const { isToday, isYesterday } = require('date-fns')

const visitController = {

    addVisit: async (req, res, next) => {
        const { placeId } = req.body
        try {
            if (!placeId) next(ApiError.badRequest('Invalid request - placeId is required'))
            await visitService.addVisit(placeId)
            return res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    },

    async getVisits(req, res, next) {
        const queryLength = Object.keys(req.query).length
        if (queryLength !== 1) return next(ApiError.badRequest('Invalid parameters count'))
        const param = Object.keys(req.query)[0]
        switch (param) {
            case 'locationId':
                return this.getVisitsByLocationId(req, res, next)
            case 'uid':
                return this.getAllVisitsByUserId(req, res, next)
            default:
                return next(ApiError.badRequest('Invalid request'))
        }
    },

    async getAllVisitsByUserId(req, res, next) {
        const { uid } = req.query
        try {
            const locationIds = await placeService.getLocationIdsByUserId(uid)
            const visitData = await visitService.getVisitsByLocationIds(locationIds)
            console.log(visitData)
            return res.status(200).json(allVisitsDto(visitData))
        } catch (err) {
            return next(err)
        }
    },

    getVisitsByLocationId: async (req, res, next) => {
        const { uid } = req.cookies
        console.log(req.cookies)
        if (!uid) return next(ApiError.badRequest('uid is required'))
        const { locationId } = req.query
        try {
            const place = await placeService.findByLocationId(locationId)
            if (place.userId.toString() !== uid.toString()) throw ApiError.internal('Illegal operation')
            const visitData = await visitService.getVisitsByLocationId(locationId, uid)
            return res.status(200).json(visitDto(visitData))
        } catch (err) {
            next(err)
        }
    },

    deleteVisits: async (req, res) => {
        try {
            await visitService.deleteVisits()
            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}

module.exports = visitController