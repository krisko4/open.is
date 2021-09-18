const visitService = require('./visit_service')
const visitDto = require('./model/visit_dto')

const visitController = {
   
    addVisit: async (req, res) => {
        const { placeId} = req.body
        try {
            if (!placeId) throw new Error('Invalid request')
            await visitService.addVisit(placeId)
            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },

   

    getVisitsByPlaceId: async (req, res) => {
        const {uid} = req.cookies
        const {placeId} = req.query
        try {
            if(!uid) throw new Error('uid is required')
            const visits = await visitService.getVisitsByPlaceId(placeId, uid)
            return res.status(200).json(visits.map(visit => visitDto(visit)))
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
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