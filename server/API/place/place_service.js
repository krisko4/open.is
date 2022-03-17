const Place = require('./model/place')
const mongoose = require('mongoose')
const ApiError = require('../../errors/ApiError')
const fs = require('fs')
const cloudinary = require('../../config/cloudinary')




const placeService = {


    async getPlaceOwnedByUser(placeId, userId) {
        console.log(placeId)
        const place = await this.getPlaceById(placeId)
        if (!place) throw ApiError.internal('Invalid placeId')
        if (place.userId.toString() !== userId.toString()) throw ApiError.internal('Illegal operation')
        return place
    },


    async setSelectedLocationsAlwaysOpen(user, placeId, locationIds) {
        await this.getPlaceOwnedByUser(placeId, user._id)
        return Place.findByIdAndUpdate(
            placeId,
            {
                'locations.$[item].alwaysOpen': true,
                'locations.$[item].isActive': true
            },
            { arrayFilters: [{ 'item._id': { $in: locationIds } }], new: true, upsert: true }
        ).exec()


    },


    async addLocations(user, placeId, locations) {
        const place = await this.getPlaceOwnedByUser(placeId, user._id)
        const addressIds = locations.map(loc => loc.addressId)
        const duplicateAddress = await this.getFirstPlaceByAddressIds(addressIds)
        if (duplicateAddress) throw ApiError.internal('Occupied location addition attempt')
        return Place.findByIdAndUpdate(placeId, { $push: { 'locations': locations } }, { new: true, upsert: true }).exec()
    },

    getFirstPlaceByAddressIds(addressIds) {
        return Place.findOne({ 'locations.addressId': { $in: addressIds } }).exec()
    },

    groupedPlaceObject: {
        '_id': '$_id',
        'name': { '$first': '$name' },
        'type': { '$first': '$type' },
        'logo': { '$first': '$logo' },
        'images': { '$first': '$images' },
        'description': { '$first': '$description' },
        'createdAt': { '$first': '$createdAt' },
        'subtitle': { '$first': '$subtitle' },
        'userId': { '$first': '$userId' },
        'locations': {
            '$addToSet': '$locations'
        }
    },

    getPaginatedPlaceData(start, limit) {
        return {
            metadata: [
                { $count: 'total' },
                {
                    $addFields: {
                        start: start,
                        limit: limit
                    }
                }
            ],
            data: [
                { $skip: start },
                { $limit: limit },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        subtitle: 1,
                        type: 1,
                        logo: {
                            $concat: [`${process.env.CLOUDI_URL}/`, '$logo']
                        },
                        status: '$locations.status',
                        locationId: '$locations._id',
                        lat: '$locations.lat',
                        lng: '$locations.lng',
                        address: "$locations.address",
                    }
                }
            ]

        }

    },

    aggregateFavoriteLocations: (favIds) => {
        return [{
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

    async getPlacesWithUnwindedLocations(start, limit) {

        return Place.aggregate()
            .unwind('locations')
            .facet({
                metadata: [
                    { $count: 'total' },
                    {
                        $addFields: {
                            start: start,
                            limit: limit
                        }
                    }
                ],
                data: [
                    { $skip: start },
                    { $limit: limit },
                ]
            })
    },

    async changeOpeningHoursForSelectedLocations(user, placeId, locationIds, openingHours) {
        await this.getPlaceOwnedByUser(placeId, user._id)
        return Place.findByIdAndUpdate(
            placeId,
            { 'locations.$[item].openingHours': openingHours, 'locations.$[item].isActive': true, 'locations.$[item].alwaysOpen': false },
            { arrayFilters: [{ 'item._id': { $in: locationIds } }], new: true, upsert: true }
        ).exec()
    },

    async changeContactDetailsForLocations(user, placeId, locationIds, contactDetails) {
        await this.getPlaceOwnedByUser(placeId, user._id)
        const detailsArray = Object.keys(contactDetails).map(key => {
            const returnedKey = 'locations.$[item].' + key
            const returnedObj = {}
            returnedObj[returnedKey] = contactDetails[key]
            return returnedObj
        })
        const detailsObj = {}
        detailsArray.forEach(el => {
            Object.assign(detailsObj, el)
        })
        console.log(detailsObj)
        return Place.findByIdAndUpdate(
            placeId,
            detailsObj,
            { arrayFilters: [{ 'item._id': { $in: locationIds } }], new: true, upsert: true })
            .exec()

    },

    async deleteLocations(user, placeId, locationIds) {
        const place = await this.getPlaceOwnedByUser(placeId, user._id)
        if (locationIds.length === place.locations.length) {
            await Promise.all([
                cloudinary.uploader.destroy(place.logo),
                place.images.map(image => cloudinary.uploader.destroy(image))
            ])
            return Place.findByIdAndDelete(placeId)
        }
        return Place.findByIdAndUpdate(placeId, { $pull: { 'locations': { '_id': locationIds } } }, { new: true, upsert: true }).exec()
    },

    getPlaces: () => Place.find().exec(),
    getPlaceNames: (name) => Place.distinct('name', { name: name }).exec(),
    getPlaceTypes: (type) => Place.distinct('type', { type: type }).exec(),
    getPlaceByIdAndUserId: (id, userId) => Place.findById(id, { userId: userId }).exec(),
    async getLocationIdsByUserId(userId)  {
        const results = await Place.find({ userId: userId }, 'locations._id').lean().exec()
        const locationIds = []
        for (const result of results) {
            for (const location of result.locations) {
                locationIds.push(location._id)
            }
        }
        return locationIds
    },

    getFavoritePlaces(start, limit, favIds, matchParams) {
        favIds = favIds.map(el => mongoose.Types.ObjectId(el))
        return Place.aggregate()
            .unwind('locations')
            .match({
                'locations._id': {
                    $in: favIds
                },
                'locations.isActive': true,
                ...matchParams
            })
            .facet(this.getPaginatedPlaceData(parseInt(start), parseInt(limit)))
    },

    getActivePlaces(start, limit) {
        if (start && limit) {
            return Place.aggregate()
                .unwind('locations')
                .match({ 'locations.isActive': true })
                .facet(this.getPaginatedPlaceData(parseInt(start), parseInt(limit)))
        }
        return Place.aggregate()
            .unwind('locations')
            .match({ 'locations.isActive': true })
            .group(this.groupedPlaceObject)
    },
    getTop20PlacesSortedBy(sortParam) {
        return Place.aggregate()
            .unwind('locations')
            .match({ 'locations.isActive': true })
            .limit(20)
            .sort(sortParam)
            .group(this.groupedPlaceObject)
    },
    getPlacesPaginatedSortedBy(start, limit, sortParam, matchParams) {
        return Place.aggregate()
            .unwind('locations')
            .match({
                'locations.isActive': true,
                ...matchParams
            })
            .sort(sortParam)
            .facet(this.getPaginatedPlaceData(parseInt(start), parseInt(limit)))
    },

    getStatus(locationId) {
        return Place.findOne({ 'locations._id': locationId }, { status: '$locations.status' }).lean().exec()
    },
    getOpeningHours(locationId) {
        return Place.findOne({ 'locations._id': locationId }, {
            openingHours: '$locations.openingHours',
            alwaysOpen: '$locations.alwaysOpen',
            isActive: '$locations.isActive',
        }).lean().exec()
    },
    getAverageNote(locationId) {
        return Place.findOne({ 'locations._id': locationId }, { averageNote: '$locations.averageNote' }).lean().exec()
    },
    getActivePlacesBy(param, start, limit) {
        return Place.aggregate()
            .unwind('locations')
            .match({
                'locations.isActive': true,
                ...param
            })
            .facet(this.getPaginatedPlaceData(parseInt(start), parseInt(limit)))
    },

    async getPlaceByIdAndSelectedLocation(placeId, locationId) {
        const foundPlaces = await Place.aggregate()
            .unwind('locations')
            .match({
                '_id': mongoose.Types.ObjectId(placeId),
                'locations._id': mongoose.Types.ObjectId(locationId)
            })
            .group(this.groupedPlaceObject)
        const place = foundPlaces[0]
        if (!place) throw ApiError.internal('Invalid placeId')
        return place
    },

    getActivePlacesByAddressesAndNames(addresses, names) {
        return Place.aggregate()
            .unwind('locations')
            .match({
                'locations.isActive': true,
                name: names,
                'locations.address': addresses
            })
            .group(this.groupedPlaceObject)
    },
    getPlaceByLocationId: (locationId) => Place.findOne({ 'locations._id': locationId }).exec(),

    setAlwaysOpen: async (alwaysOpen, locationId) => {
        return Place.findOneAndUpdate({ 'locations._id': locationId }, { 'locations.$.alwaysOpen': alwaysOpen, 'locations.$.isActive': true }, { new: true, runValidators: true }).exec()
    },


    editPlace: async (placeData, user) => {
        const { lat, lng, logo, images, locations } = placeData
        console.log(placeData)
        console.log(locations)
        const place = await placeService.getPlaceByLocationId(placeData._id)
        if (!place) throw new Error('Invalid locationId')
        if (!user._id.equals(place.userId)) throw new Error('Illegal operation')
        const duplicateAddress = await placeService.getPlaceByLatLng(lat, lng)
        if (duplicateAddress && duplicateAddress._id != placeData._id) throw ApiError.internal('This address is already occupied by another place')
        let editedPlace
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            const dataToChange = {
                name: placeData.name,
                subtitle: placeData.subtitle,
                description: placeData.description,
                type: placeData.type,
                'locations.$.email': locations[0].email,
                'locations.$.phone': locations[0].phone,
                'locations.$.website': locations[0].website,
                'locations.$.facebook': locations[0].facebook,
                'locations.$.instagram': locations[0].instagram,
                'locations.$.lat': locations[0].lat,
                'locations.$.lng': locations[0].lng,
                'locations.$.address': locations[0].address
            }
            if (logo) {
                await cloudinary.uploader.destroy(place.logo)
                const uploadResponse = await cloudinary.uploader.upload(logo.path, {
                    upload_preset: 'place_logos'
                })
                dataToChange.logo = uploadResponse.public_id
            }
            if (images) {
                const urlImages = []
                await place.images.map(image => cloudinary.uploader.destroy(image))
                for (const image of images) {
                    const res = await cloudinary.uploader.upload(image.path, {
                        upload_preset: 'place_images'
                    })
                    urlImages.push(res.public_id)
                }
                dataToChange.images = urlImages
            }
            editedPlace = await Place.findOneAndUpdate({ 'locations._id': placeData._id },
                dataToChange, { new: true, session: session }
            ).exec()
        })
        await session.endSession()
        return editedPlace
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
            if (images) {
                for (const image of images) {
                    const res = await cloudinary.uploader.upload(image.path, {
                        upload_preset: 'place_images'
                    })
                    urlImages.push(res.public_id)
                }
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
    getPlaceById: (id) => Place.findById(id).lean().exec(),
    findByLocationId: (id) => Place.findOne({ 'locations._id': id }).exec(),
    getPlaceByLatLng: (lat, lng) => Place.findOne({ 'locations.lat': lat, 'locations.lng': lng }).exec(),
    getPlacesByAddress: (address) => Place.find({ address: address }).exec(),
    getPlacesBy: (param) => Place.find({ ...param }).exec(),
    getPlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid) }).lean().exec(),
    getActivePlacesByUserId: (uid) => Place.find({ userId: mongoose.Types.ObjectId(uid), isActive: true }).exec(),
    deleteAll: () => Place.deleteMany().exec(),
    incrementVisitCount: (id) => Place.find({ 'locations._id': id }, { $inc: { 'visitCount': 1 } }, { new: true }).exec(),
    setStatus: (id, status) => Place.findOneAndUpdate({ 'locations._id': id }, { 'locations.$.status': status }, { new: true, runValidators: true }).exec(),
    setOpeningHours: (id, hours) => Place.findOneAndUpdate({ 'locations._id': id }, { 'locations.$.openingHours': hours, 'locations.$.isActive': true, 'locations.$.alwaysOpen': false }, { new: true, runValidators: true }).exec(),

    // deletePlace: async (id) => {
    //     const place = await placeService.getPlaceById(id)
    //     if (!place) throw new Error('No place with provided id found')
    //     const imagePath = process.cwd() + `\\public\\images\\places\\` + place.img
    //     fs.unlink(imagePath, err => {
    //         if (err) throw new Error(err)
    //     })
    //     await Place.findByIdAndDelete(id).exec()

    // },


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
            default:
                throw new Error('Invalid note value')
        }
        const valueArray = Object.values(averageNote)
        averageNote['average'] = valueArray.reduce((a, b, index) => a + b * (index + 1)) / valueArray.reduce((a, b) => a + b)
        averageNote['_id'] = id
        await Place.findOneAndUpdate({ 'locations._id': locationId }, { 'locations.$.averageNote': averageNote }, { new: true, session: session }).exec()
        return averageNote
    }

}

module.exports = placeService