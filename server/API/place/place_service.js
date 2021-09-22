const Place = require('./model/place')
const mongoose = require('mongoose')
const opinionService = require('../opinion/opinion_service')
const userValidator = require('../user/model/user_validator')
const ApiError = require('../../errors/ApiError')




const placeService = {

    getPlaces: () => {
       
        return Place.find().exec()
    },
    getActivePlaces: () => {
        return Place.find({isActive: true}).exec()
    },

    getPlaceNames: (name) => {
        return Place.find({name: name}, 'name').exec()
    },

    getPlaceByIdAndUserId: (id, userId) => Place.findById(id, {userId: mongoose.Types.ObjectId(userId)}).exec(),

    getTop20PlacesSortedBy: (param) => Place.find().sort(param).limit(20).exec(),

    // getRecentlyAddedPlaces: () => Place.find().sort({createdAt: -1}).limit(20).exec(),

    // getPopularPlaces: () =>  Place.find().sort({visitCount: -1}).limit(20).exec(),

    getActivePlacesByAddressesAndNames: (addresses, names) => Place.find({name: names, address: addresses}).exec(),

    addPlace: (placeData) => {
        return new Place({
            _id: new mongoose.Types.ObjectId,
            ...placeData
        }).save()
    },

    test: (message) => {
        if (!message) throw new ApiError(400, 'message is required')
    },

    activatePlace: (id) => Place.findByIdAndUpdate(id, {'isActive' : true}, {new: true}).exec(),

    getPlaceById : (id) => Place.findById(id).exec(),

    getPlaceByLatLng: (lat, lng) => Place.findOne({lat: lat, lng: lng}).exec(),

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