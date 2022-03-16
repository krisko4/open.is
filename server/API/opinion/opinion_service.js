const Opinion = require('./model/opinion')
const userService = require('../user/user_service')
const placeService = require('../place/place_service')
const ApiError = require('../../errors/ApiError')
const mongoose = require('mongoose')
const { startOfDay, endOfDay } = require('date-fns')
const opinionService = {


    getOpinionsBy: (property) => {
        if (property) return Opinion.find(property).sort({ date: -1 }).populate('author').exec()
    },


    getOpinions: () => {
        return Opinion.find().populate('author').exec()
    },

    async getOpinionsByLocationIds(locationIds) {
        const start = startOfDay(new Date())
        const end = endOfDay(new Date())
        return Opinion.aggregate()
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
                    { $group: { _id: null, today: { $count: {} } } },
                    { $project: { _id: 0 } }
                ],
                total: [
                    { $group: { _id: null, total: { $count: {} } } },
                    { $project: { _id: 0 } }
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
                            opinions: { $push: { date: '$date', author: '$author', note: '$note', content: '$content' } }
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

    addNewOpinion: async (opinionData, session) => {
        const user = await userService.getUserById(opinionData.authorId)
        if (!user) throw ApiError.internal(`User with id ${opinionData.authorId} not found`)
        delete (opinionData['authorId'])
        const opinion = await new Opinion({
            _id: new mongoose.Types.ObjectId,
            ...opinionData,
            author: user._id,
            date: new Date()
        }).save({ session })
        console.log(opinion)
        return opinion.populate('author').execPopulate()
    },

    deleteOpinions: () => Opinion.deleteMany().exec(),
    deleteOpinionsByPlaceId: (placeId) => Opinion.deleteMany({ placeId: placeId }).exec(),
    getOpinionCount: (placeId) => {
        return Opinion.countDocuments({ placeId: placeId }).exec()
    }
}

module.exports = opinionService