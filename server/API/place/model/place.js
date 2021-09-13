const mongoose = require('mongoose')
const {ReqString, ReqNumber, ReqId} = require('../../../helpers/common_types')
mongoose.set('useCreateIndex', true)



const AverageNoteSchema = new mongoose.Schema({
    ones : Number,
    twos: Number,
    threes: Number,
    fours: Number,
    fives: Number,
    average: Number
})

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
        address: {
            type: String,
            unique: true,
            required: true
        },
        phone: ReqString,
        email: ReqString,
        type: ReqString,
        lat: ReqString,
        lng: ReqString,
        img: ReqString,
        description: ReqString,
        subtitle: String,
        status: {
            type: String,
            enum: ['open', 'closed'],
            default: 'closed'
        },
        website: String,
        openingHours: {
            type: OpeningHoursSchema
        },
        userId: ReqId,
        visitCount: {
            type: Number,
            default: 0
        },
        averageNote: {
            type: AverageNoteSchema,
            default : {
                ones: 0,
                twos: 0,
                threes: 0,
                fours: 0,
                fives: 0,
                average: 0
            }
        }
    }
)

module.exports = mongoose.model('Place', PlaceSchema)