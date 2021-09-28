const opinionService = require('./opinion_service')
const placeService = require('../place/place_service')
const opinionDto = require('./model/opinion_dto')
const mongoose = require('mongoose')
const ApiError = require('../../errors/ApiError')

const opinionController = {
    getOpinionsBy: async (req, res, next) => {
        const queryLength = Object.keys(req.query).length
        console.log(queryLength)
        switch (queryLength) {
            case 1:
                let param = Object.keys(req.query)[0]
                let value = req.query[param]
                if (param === 'authorId' || param === 'placeId') {
                    if (param === 'authorId') param = param.substring(0, param.length - 2)
                    value = mongoose.Types.ObjectId(value)
                }
                try {
                    const property = {}
                    property[param] = value
                    const opinions = await opinionService.getOpinionsBy(property)
                    return res.status(200).json(opinions.map(opinion => opinionDto(opinion)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                try {
                    const opinions = await opinionService.getOpinions()
                    //  const opinionsDto = opinions.map(opinion => opinionDto(opinion))
                    return res.status(200).json(opinions)
                } catch (err) {
                    return next(err)
                }
            default:
                return next(ApiError.badRequest('Invalid request'))

        }

    },
    addNewOpinion: async (req, res, next) => {
        const {authorId, note, placeId } = req.body
        if (!authorId || !placeId || !note || note > 5 || note < 1) return res.status(400).json({ error: 'Invalid request' })
        try {
            const opinion = opinionDto(await opinionService.addNewOpinion(req.body))
            const updatedPlace = await placeService.updateNote(note, placeId)
            return res.status(200).json({ message: 'New opinion added successfully!', opinion, averageNote: updatedPlace.averageNote})
        } catch (err) {
            return next(err)
        }
    },

    deleteOpinions: async (req, res, next) => {
        try {
            await opinionService.deleteOpinions()
            return res.status(200).json({ message: 'All opinions deleted successfully!' })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = opinionController