const mongoose = require('mongoose')


const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const reqObject = {
    type: Number,
    required: true
}

const openingHoursSchema = new mongoose.Schema({
    monday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    tuesday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    wednesday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    thursday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    friday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    saturday: {
        startHour: reqNumber,
        endHour: reqNumber
    },
    sunday: {
        startHour: reqNumber,
        endHour: reqNumber
    }
})

const placeSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: reqString,
        address: reqString,
        type: reqString,
        lat: reqString,
        lng: reqString,
        description: reqString,
        status: reqString,
        openingHours: {
            type: openingHoursSchema,
            required: true
        }

    }
)

module.exports = mongoose.model('Place', placeSchema)