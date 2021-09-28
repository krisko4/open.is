const Opinion = require('./model/opinion')
const userService = require('../user/user_service')
const placeService = require('../place/place_service')
const mongoose = require('mongoose')
const opinionService = {


    getOpinionsBy: (property) => {
        if (property) return Opinion.find(property).sort({ date: -1 }).populate('author').exec()
    },


    getOpinions: () => {
        return Opinion.find().populate('author').exec()
    },

    addNewOpinion: async (opinionData) => {
        const user = await userService.getUserById(opinionData.authorId)
        if (!user) throw `User with id ${opinionData.authorId} not found`
        delete (opinionData['authorId'])
        const opinion = await new Opinion({
            _id: new mongoose.Types.ObjectId,
            ...opinionData,
            author: user._id,
            date: new Date()
        }).save()
    //    await placeService.updateNote(placeData.note, placeData.placeId)
        return opinion.populate('author').execPopulate()
    },

    deleteOpinions: () => {
        return Opinion.deleteMany().exec()
    },

    getOpinionCount: (placeId) => {
        return Opinion.countDocuments({ placeId: placeId }).exec()
    }
}

module.exports = opinionService