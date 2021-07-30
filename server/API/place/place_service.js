const Place = require('./model/place')
const mongoose = require('mongoose')

const placeService = {

    getPlaces: () => {
        return Place.find().exec()
    },

    addPlace: (placeData) => {
        const place = new Place({
            _id: new mongoose.Types.ObjectId,
            ...placeData
        })
        return place.save()
    }
}

module.exports = placeService