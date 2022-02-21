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
        start: ReqDate,
        end: ReqDate,
        open: {
            type: Boolean,
            default: true
        }
    },
    tuesday: {
        start: ReqDate,
        end: ReqDate,
        open: {
            type: Boolean,
            default: true
        }
    },
    wednesday: {
        start: ReqDate,
        open: {
            type: Boolean,
            default: true
        },
        end: ReqDate
    },
    thursday: {
        start: ReqDate,
        open: {
            type: Boolean,
            default: true
        },
        end: ReqDate
    },
    friday: {
        start: ReqDate,
        open: {
            type: Boolean,
            default: true
        },
        end: ReqDate
    },
    saturday: {
        start: ReqDate,
        open: {
            type: Boolean,
            default: true
        },
        end: ReqDate
    },
    sunday: {
        start: ReqDate,
        open: {
            type: Boolean,
            default: true
        },
        end: ReqDate
    }
})

const PlaceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: ReqString,
    type: ReqString,
    logo: ReqString,
    images: [ReqString],
    isBusinessChain: {
        type: Boolean,
        default: false
    },
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
            alwaysOpen: {
                type: Boolean,
                default: false
            },
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