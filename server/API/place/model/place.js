const mongoose = require('mongoose')
const { ReqString, ReqDate, ReqBoolean, ReqId, ReqNumber } = require('../../../helpers/common_types')
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
    type: ReqString,
    logo: ReqString,
    images: [ReqString],
    description: ReqString,
    createdAt: {
        type: Date,
        default: new Date()
    },
    subtitle: String,
    userId: ReqId,
    locations: [
        {
            address: ReqString,
            lat: ReqNumber,
            lng: ReqNumber,
            facebook: String,
            instagram: String,
            phone: ReqString,
            email: String,
            website: String,
            status: {
                type: String,
                enum: ['open', 'closed'],
                default: 'closed'
            },
            openingHours: {
                type: OpeningHoursSchema
            },
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
            },
            visits: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Visit"
                }
            ],
            news: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "News"

                }
            ],
            opinions: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Opinions"

                }

            ]
        }
    ],
}
)

module.exports = mongoose.model('Place', PlaceSchema)