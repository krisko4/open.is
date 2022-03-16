const Visit = require('./model/visit')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')
const { startOfMinute, endOfMinute, format, startOfDay, endOfDay } = require('date-fns')
const visitService = {

    addVisit: async (locationId) => {
        const existingVisit = await Visit.findOne({ date: { $gte: startOfMinute(new Date()), $lte: endOfMinute(new Date()) }, locationId: mongoose.Types.ObjectId(locationId) }).exec()
        if (existingVisit) return Visit.findByIdAndUpdate(existingVisit._id, { $inc: { visitCount: 1 } }, { new: true })
        console.log('adding visit')
        console.log(locationId)
        return new Visit({
            _id: new mongoose.Types.ObjectId,
            date: new Date(),
            locationId: locationId,
            visitCount: 1
        }).save()
    },

    getVisitsByLocationIds: async (locationIds) => {
        const start = startOfDay(new Date())
        const end = endOfDay(new Date())
        return Visit.aggregate()
            .match({
                locationId: { $in: locationIds }
            })
            .facet({
                today: [
                    {
                        $match: {
                            date: { $gte: start, $lt: end }
                        }
                    },
                    { $group: { _id: null, today: { $sum: '$visitCount' } } },
                    {$project : {_id: 0}}
                ],
                total: [
                    { $group: { _id: null, total: { $sum: '$visitCount' } } },
                    {$project : {_id: 0}}
                ],
                data: [
                    { $sort: { date: 1 } },
                    {
                        $lookup: {
                            from: 'places',
                            localField: 'locationId',
                            foreignField: 'locations._id',
                            as: 'name'
                        }
                    },
                    {
                        $set: {
                            name: { $arrayElemAt: ["$name.name", 0] }
                        }
                    },
                    {
                        $group: {
                            _id: '$locationId',
                            name: { '$first': '$name' },
                            visits: { $push: { date: '$date', visitCount: '$visitCount' } }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]
            })
    },


    getVisitsByLocationId: async (locationId, userId) => {
        return Visit.aggregate()
            .match({
                locationId: new mongoose.Types.ObjectId(locationId)
            })
            .facet({
                metadata: [
                    { $group: { _id: null, total: { $sum: '$visitCount' } } },
                    { $project: { _id: 0 } }
                ],
                data: [
                    { $sort: { date: 1 } },
                    { $project: { _id: 0, __v: 0 } }
                ]
            })
    },

    deleteVisits: () => Visit.deleteMany().exec(),
    deleteVisitsByPlaceId: (locationId) => Visit.deleteMany({ locationId: locationId }).exec(),


}

module.exports = visitService