const visitService = require('./visit_service')
const visitDto = require('./model/visit_dto')
const ApiError = require('../../errors/ApiError')

const visitController = {
   
    addVisit: async (req, res, next) => {
        const { placeId} = req.body
        try {
            if (!placeId) next( ApiError.badRequest('Invalid request - placeId is required'))
            await visitService.addVisit(placeId)
            return res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    },

   

    getVisitsByPlaceId: async (req, res, next) => {
        const {uid} = req.cookies
        const {placeId} = req.query
        try {
            if(!uid) next(ApiError.badRequest('uid is required'))
            const visits = await visitService.getVisitsByPlaceId(placeId, uid)
            return res.status(200).json(visits.map(visit => visitDto(visit)))
        } catch (err) {
            next(err)
        }
    },

    deleteVisits: async (req, res) => {
        try{
            await visitService.deleteVisits()
            return res.sendStatus(200)
        }catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    }
}

module.exports = visitController