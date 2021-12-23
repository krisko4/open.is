const Opinion = require('./model/opinion')
const userService = require('../user/user_service')
const placeService = require('../place/place_service')
const ApiError = require('../../errors/ApiError')
const mongoose = require('mongoose')
const opinionService = {


    getOpinionsBy: (property) => {
        if (property) return Opinion.find(property).sort({ date: -1 }).populate('author').exec()
    },


    getOpinions: () => {
        return Opinion.find().populate('author').exec()
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
        }).save({session})
        console.log(opinion)
        return opinion.populate('author').execPopulate()
    },

    deleteOpinions: () => Opinion.deleteMany().exec(),
    deleteOpinionsByPlaceId: (placeId) => Opinion.deleteMany({placeId: placeId}).exec(),
    getOpinionCount: (placeId) => {
        return Opinion.countDocuments({ placeId: placeId }).exec()
    }
}

module.exports = opinionService