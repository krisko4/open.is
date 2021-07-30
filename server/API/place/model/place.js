const mongoose = require('mongoose')
const {ReqString, ReqNumber} = require('../../../helpers/common_types')
mongoose.set('useCreateIndex', true)

const OpeningHoursSchema = new mongoose.Schema({
    monday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    tuesday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    wednesday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    thursday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    friday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    saturday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    },
    sunday: {
        startHour: ReqNumber,
        endHour: ReqNumber
    }
})

const PlaceSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: ReqString,
        address: ReqString,
        phone: ReqString,
        email: ReqString,
        type: ReqString,
        lat: ReqString,
        lng: ReqString,
        img: String,
        description: String,
        subtitle: ReqString,
        status: ReqString,
        website: String,
        openingHours: {
            type: OpeningHoursSchema,
            required: true
        }

    }
)

module.exports = mongoose.model('Place', PlaceSchema)