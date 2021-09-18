const Visit = require('./model/visit')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')
const {startOfDay, endOfDay} = require('date-fns')
const visitService = {

    addVisit: async (placeId) => {
        const existingVisits = await Visit.find({ date: {$gte: startOfDay(new Date()), $lte: endOfDay(new Date())}, placeId: mongoose.Types.ObjectId(placeId)}).exec()
        console.log(existingVisits)
        if (existingVisits.length > 0) return Visit.findByIdAndUpdate(existingVisits[0]._id, { $inc: { visitCount: 1 } }, { new: true })
        return new Visit({
            _id: new mongoose.Types.ObjectId,
            date: new Date(),
            placeId: placeId,
            visitCount: 1
        }).save()
    },


    getVisitsByPlaceId: async(placeId, userId) => {
        const place = await placeService.getPlaceByIdAndUserId(placeId, userId)
        if(!place) throw new Error('No place found for provided parameters')
        return Visit.find({placeId: place._id}).sort({date: 1}).exec()
    },

    deleteVisits: async () => Visit.deleteMany().exec()

    
}

module.exports = visitService