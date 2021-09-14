const Place = require('./model/place')
const mongoose = require('mongoose')
const opinionService = require('../opinion/opinion_service')




const placeService = {

    getPlaces: () => {
        return Place.find().exec()
    },
    getActivePlaces: () => {
        return Place.find({isActive: true}).exec()
    },

    addPlace: (placeData) => {
        return new Place({
            _id: new mongoose.Types.ObjectId,
            ...placeData
        }).save()
    },

    activatePlace: (id) => Place.findByIdAndUpdate(id, {'isActive' : true}, {new: true}).exec(),

    getPlaceById : (id) => Place.findById(id).exec(),

    getPlacesByAddress: (address) => Place.find({ address: address }).exec(),

    getPlacesBy: (param) => Place.find({...param}).exec(),
    getActivePlacesBy: (param) => Place.find({...param, isActive: true}).exec(),

    getPlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid) }).exec(),
    getActivePlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid), isActive: true}).exec(),

    deleteAll: () => Place.deleteMany().exec(),

    incrementVisitCount: (id) => Place.findByIdAndUpdate(id, { $inc: { 'visitCount': 1 } }, { new: true }).exec(),

    setStatus: (id, status) => Place.findByIdAndUpdate(id, { 'status': status }, { new: true, runValidators: true }).exec(),

    setOpeningHours: (id, hours) => Place.findByIdAndUpdate(id, {'openingHours' : hours, 'isActive' : true}, {new: true, runValidators: true}).exec(), 

    updateNote: async (note, placeId) => {
        const doc = await Place.findById(placeId, 'averageNote').exec()
        const averageNote = JSON.parse(JSON.stringify(doc.averageNote)) 
        delete averageNote['average']
        const id = averageNote['_id']
        delete averageNote['_id']
        switch (note) {
            case 1:
                averageNote['ones']++
                break
            case 2:
                averageNote['twos']++
                break
            case 3:
                averageNote['threes']++
                break
            case 4:
                averageNote['fours']++
                break
            case 5:
                averageNote['fives']++
                break
            default: throw new Error('Invalid note value')
        }
        const valueArray = Object.values(averageNote)
        averageNote['average'] = valueArray.reduce((a, b, index) => a+b*(index + 1)) / valueArray.reduce((a,b) => a+b)
        averageNote['_id'] = id
        return Place.findByIdAndUpdate(placeId, { 'averageNote': averageNote }, { new: true }).exec()
    }

}

module.exports = placeService