const Visit = require('./model/visit')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')
const {startOfMinute, endOfMinute, format} = require('date-fns')
const visitService = {

    addVisit: async (placeId) => {
        const existingVisit = await Visit.findOne({ date: {$gte: startOfMinute(new Date()), $lte: endOfMinute(new Date())}, placeId: mongoose.Types.ObjectId(placeId)}).exec()
        if (existingVisit) return Visit.findByIdAndUpdate(existingVisit._id, { $inc: { visitCount: 1 } }, { new: true })
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