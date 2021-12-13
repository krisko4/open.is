const Place = require('./model/place')
const mongoose = require('mongoose')
const ApiError = require('../../errors/ApiError')
const fs = require('fs')
const cloudinary = require('../../config/cloudinary')




const placeService = {

    getPlaces: () => Place.find().exec(),
    getActivePlaces: () => Place.find({ isActive: true }).exec(),
    getPlaceNames: (name) => Place.find({ name: name }, 'name').exec(),
    getPlaceByIdAndUserId: (id, userId) => Place.findById(id, { userId: mongoose.Types.ObjectId(userId) }).exec(),
    getTop20PlacesSortedBy: (sortParam, types) => Place.find({ 'locations.isActive': true }).sort(sortParam).limit(20).exec(),
    getActivePlacesByAddressesAndNames: (addresses, names) => Place.find({ name: names, address: addresses }).exec(),
    getPlaceByLocationId: (locationId) => Place.findOne({ 'locations._id': locationId }).exec(),
    editPlace: async (placeData, user) => {
        const { lat, lng, img } = placeData
        const place = await placeService.getPlaceByLocationId(placeData._id)
        if (!place) throw new Error('Invalid locationId')
        if (!user._id.equals(place.userId)) throw new Error('This user is not allowed to edit this place')
        const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
        if (duplicateAddress && duplicateAddress._id != placeData._id) throw ApiError.internal('This address is already occupied by another place')
        let editedPlace
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            if (img) {
                await cloudinary.uploader.destroy(place.img)
                const uploadResponse = await cloudinary.uploader.upload(img.tempFilePath, {
                    upload_preset: 'place_images'
                })
                placeData.img = uploadResponse.public_id
            }
            // editedPlace = Place.findByIdAndUpdate(placeData._id, placeData, { new: true }).exec()
            editedPlace = Place.findOneAndUpdate(
                { 'locations._id': placeData._id },
                {
                    name: placeData.name,
                    subtitle: placeData.subtitle,
                    description: placeData.description,
                    type: placeData.type,
                    'locations.$.email': placeData.email,
                    'locations.$.phone': placeData.phone,
                    'locations.$.website': placeData.website,
                    'locations.$.facebook': placeData.facebook,
                    'locations.$.instagram': placeData.instagram,
                    'locations.$.lat': placeData.lat,
                    'locations.$.lng': placeData.lng,
                    'locations.$.address': placeData.address
                },
                { new: true }
            ).exec()
        })
        await session.endSession()
        return editedPlace

    },




    addPlace: async (placeData) => {
        const { img, locations } = placeData
        console.log(locations)
        for (const location of locations) {
            const {lat, lng} = location
            const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
            if (duplicateAddress) throw ApiError.internal('This address is already occupied by another place')
        }
        // upload image to cloudinary
        const session = await mongoose.startSession()
        let newPlace
        await session.withTransaction(async () => {
            if (img) {
                const uploadResponse = await cloudinary.uploader.upload(img.tempFilePath, {
                    upload_preset: 'place_images'
                })
                placeData.img = uploadResponse.public_id
            }
            newPlace = await new Place({
                _id: new mongoose.Types.ObjectId,
                ...placeData
            }).save({ session })
        })
        await session.endSession()
        return newPlace
    },

    test: (message) => {
        if (!message) throw new ApiError(400, 'message is required')
    },

    activatePlace: (id) => Place.findByIdAndUpdate(id, { 'isActive': true }, { new: true }).exec(),
    getPlaceById: (id) => Place.findById(id).exec(),
    findByLocationId: (id) => Place.find({ 'locations._id': id }).exec(),
    getPlaceByLatLng: (lat, lng) => Place.findOne({ 'locations.lat': lat, 'locations.lng': lng }).exec(),
    getPlacesByAddress: (address) => Place.find({ address: address }).exec(),
    getPlacesBy: (param) => Place.find({ ...param }).exec(),
    getActivePlacesBy: (param) => Place.find({ ...param, isActive: true }).exec(),
    getPlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid) }).exec(),
    getActivePlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid), isActive: true }).exec(),
    deleteAll: () => Place.deleteMany().exec(),
    incrementVisitCount: (id) => Place.find({ 'locations._id': id }, { $inc: { 'visitCount': 1 } }, { new: true }).exec(),
    setStatus: (id, status) => Place.findOneAndUpdate({ 'locations._id': id }, { 'locations.$.status': status }, { new: true, runValidators: true }).exec(),
    setOpeningHours: (id, hours) => Place.findOneAndUpdate(
        { 'locations._id': id },
        { 'locations.$.openingHours': hours, 'locations.$.isActive': true },
        { new: true, runValidators: true }
    ).exec(),
    deletePlace: async (id) => {
        const place = await placeService.getPlaceById(id)
        if (!place) throw new Error('No place with provided id found')
        const imagePath = process.cwd() + `\\public\\images\\places\\` + place.img
        fs.unlink(imagePath, err => {
            if (err) throw new Error(err)
        })
        await Place.findByIdAndDelete(id).exec()

    },

    getFavoritePlaces: (favIds) => {
        favIds = favIds.map(el => mongoose.Types.ObjectId(el))
        return Place.find({ '_id': { $in: favIds } }).exec()
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