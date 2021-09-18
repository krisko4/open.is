const mongoose = require('mongoose')
const { ReqString, ReqDate, ReqBoolean, ReqId } = require('../../../helpers/common_types')
mongoose.set('useCreateIndex', true)



const AverageNoteSchema = new mongoose.Schema({
    ones: Number,
    twos: Number,
    threes: Number,
    fours: Number,
    fives: Number,
    average: Number
})

const OpeningHoursSchema = new mongoose.Schema({
    monday: {
        startHour: ReqDate,
        endHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    tuesday: {
        startHour: ReqDate,
        endHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    wednesday: {
        startHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        },
        endHour: ReqDate
    },
    thursday: {
        startHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        },
        endHour: ReqDate
    },
    friday: {
        startHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        },
        endHour: ReqDate
    },
    saturday: {
        startHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        },
        endHour: ReqDate
    },
    sunday: {
        startHour: ReqDate,
        isOpen: {
            type: Boolean,
            default: true
        },
        endHour: ReqDate
    }
})

const PlaceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: ReqString,
    address: {
        type: String,
        required: true
    },
    phone: ReqString,
    email: ReqString,
    type: ReqString,
    lat: ReqString,
    lng: ReqString,
    img: ReqString,
    description: ReqString,
    createdAt: {
        type: Date,
        default: new Date()
    },
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
        default: {
            ones: 0,
            twos: 0,
            threes: 0,
            fours: 0,
            fives: 0,
            average: 0
        }
    },
    isActive: {
        type: Boolean,
        default: false
    }
}
)

module.exports = mongoose.model('Place', PlaceSchema)