const Place = require('./model/place')
const mongoose = require('mongoose')
const ApiError = require('../../errors/ApiError')
const fs = require('fs')
const cloudinary = require('../../config/cloudinary')




const placeService = {


    aggregateFavoriteLocations: (favIds) => {
        return [
            {
                $project: {
                    name: 1,
                    type: 1,
                    img: 1,
                    description: 1,
                    createdAt: 1,
                    subtitle: 1,
                    userId: 1,
                    locations: {
                        $filter: {
                            input: '$locations',
                            as: 'location',
                            cond: { $eq: ['$$location.isActive', true], $in: ['$$location._id', favIds] }
                        }
                    }
                }

            }

        ]
    },

    async deleteLocation(user, placeId, locationId) {
        const place = await placeService.getPlaceById(placeId)
        if (!place) throw ApiError.internal('Invalid placeId')
        if (place.userId.toString() !== user._id.toString()) throw ApiError.internal('Illegal operation')
        console.log(placeId)
        console.log(locationId)
        return Place.findByIdAndUpdate(placeId, { $pull: { 'locations': {'_id' : locationId} } }, { new: true, upsert: true }).exec()
    },


    getPlaces: () => Place.find().exec(),
    getActivePlaces: () => Place.find({ 'locations.isActive': false }).exec(),
    getPlaceNames: (name) => Place.find({ name: name }, 'name').exec(),
    // getTop20PlacesSortedBy: (sortParam) => Place.aggregate(placeService.aggregateActiveLocations()).limit(20).exec(),


    getPlaceByIdAndUserId: (id, userId) => Place.findById(id, { userId: userId }).exec(),

    getFavoritePlaces: (favIds) => {
        favIds = favIds.map(el => mongoose.Types.ObjectId(el))
        console.log(favIds)
        return Place.aggregate()
            .unwind('locations')
            .match({
                'locations._id': {
                    $in: favIds
                },
                'locations.isActive': true
            })
            .group({
                '_id': '$_id',
                'name': { '$first': '$name' },
                'type': { '$first': '$type' },
                'img': { '$first': '$img' },
                'description': { '$first': '$description' },
                'createdAt': { '$first': '$createdAt' },
                'subtitle': { '$first': '$subtitle' },
                'userId': { '$first': '$userId' },
                'locations': {
                    '$addToSet': '$locations'
                }
            })
    },

    getTop20PlacesSortedBy: (sortParam) => Place.aggregate()
        .unwind('locations')
        .match({ 'locations.isActive': true })
        .limit(20)
        .sort(sortParam)
        .group({
            '_id': '$_id',
            'name': { '$first': '$name' },
            'type': { '$first': '$type' },
            'logo': { '$first': '$logo' },
            'description': { '$first': '$description' },
            'createdAt': { '$first': '$createdAt' },
            'subtitle': { '$first': '$subtitle' },
            'userId': { '$first': '$userId' },
            'images': { '$first': '$images' },
            'locations': {
                '$addToSet': '$locations'
            }
        }),
    getActivePlacesByAddressesAndNames: (addresses, names) => Place.find({ name: names, 'location.address': addresses }).lean().exec(),
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
            ).lean().exec()
        })
        await session.endSession()
        return editedPlace

    },


    setAlwaysOpen: async (alwaysOpen, locationId) => {
        console.log(alwaysOpen)
        return Place.findOneAndUpdate(
            { 'locations._id': locationId },
            { 'locations.$.alwaysOpen': alwaysOpen, 'locations.$.isActive': true },
            { new: true, runValidators: true }).exec()
    },


    addPlace: async (placeData) => {
        const { logo, images, locations } = placeData
        for (const location of locations) {
            const { lat, lng } = location
            const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
            if (duplicateAddress) throw ApiError.internal('This address is already occupied by another place')
        }
        // upload image to cloudinary
        const session = await mongoose.startSession()
        let newPlace
        await session.withTransaction(async () => {
            const uploadResponse = await cloudinary.uploader.upload(logo.path, {
                upload_preset: 'place_logos'
            })
            const urlImages = []
            for (const image of images) {
                const res = await cloudinary.uploader.upload(image.path, {
                    upload_preset: 'place_images'
                })
                urlImages.push(res.public_id)
            }
            placeData.images = urlImages
            placeData.logo = uploadResponse.public_id
            newPlace = await new Place({
                _id: new mongoose.Types.ObjectId,
                ...placeData
            }).save({ session })
        })
        await session.endSession()
        return newPlace
    },

    activatePlace: (id) => Place.findByIdAndUpdate(id, { 'isActive': true }, { new: true }).exec(),
    getPlaceById: (id) => Place.findById(id).exec(),
    findByLocationId: (id) => Place.findOne({ 'locations._id': id }).exec(),
    getPlaceByLatLng: (lat, lng) => Place.findOne({ 'locations.lat': lat, 'locations.lng': lng }).exec(),
    getPlacesByAddress: (address) => Place.find({ address: address }).exec(),
    getPlacesBy: (param) => Place.find({ ...param }).exec(),
    getActivePlacesBy: (param) => Place.find({ ...param, 'locations.isActive': true }).lean().exec(),
    getPlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid) }).lean().exec(),
    getActivePlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid), isActive: true }).exec(),
    deleteAll: () => Place.deleteMany().exec(),
    incrementVisitCount: (id) => Place.find({ 'locations._id': id }, { $inc: { 'visitCount': 1 } }, { new: true }).exec(),
    setStatus: (id, status) => Place.findOneAndUpdate({ 'locations._id': id }, { 'locations.$.status': status }, { new: true, runValidators: true }).exec(),
    setOpeningHours: (id, hours) => Place.findOneAndUpdate(
        { 'locations._id': id },
        { 'locations.$.openingHours': hours, 'locations.$.isActive': true, 'locations.$.alwaysOpen': false },
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


    updateNote: async (note, locationId, session) => {
        const place = await Place.findOne({ 'locations._id': locationId }).exec()
        const location = place.locations.find(loc => loc._id.toString() === locationId)
        let averageNote = location.averageNote
        averageNote = JSON.parse(JSON.stringify(averageNote))
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
        await Place.findOneAndUpdate({ 'locations._id': locationId }, { 'locations.$.averageNote': averageNote }, { new: true, session: session }).exec()
        return averageNote
    }

}

module.exports = placeService