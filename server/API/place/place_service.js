const Place = require('./model/place')
const mongoose = require('mongoose')
const opinionService = require('../opinion/opinion_service')
const userValidator = require('../user/model/user_validator')
const ApiError = require('../../errors/ApiError')
const fs = require('fs')




const placeService = {

    getPlaces: () => Place.find().exec(),
    getActivePlaces: () => Place.find({ isActive: true }).exec(),
    getPlaceNames: (name) => Place.find({ name: name }, 'name').exec(),
    getPlaceByIdAndUserId: (id, userId) => Place.findById(id, { userId: mongoose.Types.ObjectId(userId) }).exec(),
    getTop20PlacesSortedBy: (param) => Place.find({ isActive: true }).sort(param).limit(20).exec(),
    getActivePlacesByAddressesAndNames: (addresses, names) => Place.find({ name: names, address: addresses }).exec(),
    editPlace: async (placeData, user) => {
        const { lat, lng, img } = placeData
        const place = await placeService.getPlaceById(placeData._id)
        if (!place) throw new Error('Invalid placeId')
        if (!user._id.equals(place.userId)) throw new Error('This user is not allowed to edit this place')
        if (typeof img === 'string' && place.img !== placeData.img) throw ApiError.internal('Invalid image URL')
        const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
        if (duplicateAddress && duplicateAddress._id != placeData._id) throw ApiError.internal('This address is already occupied by another place')
        if (typeof img === 'object') {
            const imagePath = process.cwd() + `\\public\\images\\places\\` + place.img
            fs.unlink(imagePath, err => {
                if (err) throw new Error(err)
            })
            const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
            placeData.img = uniqueFilename
            const uploadPath = process.cwd() + `\\public\\images\\places\\` + uniqueFilename
            img.mv(uploadPath, err => {
                if (err) throw new Error(err)
            }
            )

        }
        return Place.findByIdAndUpdate(placeData._id, placeData, { new: true }).exec()
    },

    addPlace: async (placeData) => {
        const { lat, lng, img } = placeData
        const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
        if (duplicateAddress) throw ApiError.internal('This address is already occupied by another place')
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
        placeData.img = uniqueFilename
        const uploadPath = process.cwd() + `\\public\\images\\places\\` + uniqueFilename
        img.mv(uploadPath, err => {
            if (err) throw new Error(err)
        }
        )
        return new Place({
            _id: new mongoose.Types.ObjectId,
            ...placeData
        }).save()
    },

    test: (message) => {
        if (!message) throw new ApiError(400, 'message is required')
    },

    activatePlace: (id) => Place.findByIdAndUpdate(id, { 'isActive': true }, { new: true }).exec(),
    getPlaceById: (id) => Place.findById(id).exec(),
    getPlaceByLatLng: (lat, lng) => Place.findOne({ lat: lat, lng: lng }).exec(),
    getPlacesByAddress: (address) => Place.find({ address: address }).exec(),
    getPlacesBy: (param) => Place.find({ ...param }).exec(),
    getActivePlacesBy: (param) => Place.find({ ...param, isActive: true }).exec(),
    getPlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid) }).exec(),
    getActivePlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid), isActive: true }).exec(),
    deleteAll: () => Place.deleteMany().exec(),
    incrementVisitCount: (id) => Place.findByIdAndUpdate(id, { $inc: { 'visitCount': 1 } }, { new: true }).exec(),
    setStatus: (id, status) => Place.findByIdAndUpdate(id, { 'status': status }, { new: true, runValidators: true }).exec(),
    setOpeningHours: (id, hours) => Place.findByIdAndUpdate(id, { 'openingHours': hours, 'isActive': true }, { new: true, runValidators: true }).exec(),
    deletePlace: async (id) => {
        const place = await placeService.getPlaceById(id)
        if(!place) throw new Error('No place with provided id found')
        const imagePath = process.cwd() + `\\public\\images\\places\\` + place.img
        fs.unlink(imagePath, err => {
            if (err) throw new Error(err)
        })
        await Place.findByIdAndDelete(id).exec()

    },

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
        averageNote['average'] = valueArray.reduce((a, b, index) => a + b * (index + 1)) / valueArray.reduce((a, b) => a + b)
        averageNote['_id'] = id
        return Place.findByIdAndUpdate(placeId, { 'averageNote': averageNote }, { new: true }).exec()
    }

}

module.exports = placeService