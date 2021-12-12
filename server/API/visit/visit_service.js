const Visit = require('./model/visit')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')
const {startOfMinute, endOfMinute, format} = require('date-fns')
const visitService = {

    addVisit: async (locationId) => {
        const existingVisit = await Visit.findOne({ date: {$gte: startOfMinute(new Date()), $lte: endOfMinute(new Date())}, locationId: mongoose.Types.ObjectId(locationId)}).exec()
        if (existingVisit) return Visit.findByIdAndUpdate(existingVisit._id, { $inc: { visitCount: 1 } }, { new: true })
        return new Visit({
            _id: new mongoose.Types.ObjectId,
            date: new Date(),
            locationId: locationId,
            visitCount: 1
        }).save()
    },


    getVisitsByLocationId: async(placeId, locationId, userId) => {
        const place = await placeService.getPlaceByIdAndUserId(placeId, userId)
        if(!place) throw new Error('No place found for provided parameters')
        return Visit.find({locationId: locationId}).sort({date: 1}).exec()
    },

    deleteVisits: () => Visit.deleteMany().exec(),
    deleteVisitsByPlaceId: (locationId) => Visit.deleteMany({locationId: locationId}).exec(),

    
}

module.exports = visitService