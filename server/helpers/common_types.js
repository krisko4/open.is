const mongoose = require('mongoose')

const CommonTypes = {

    ReqString: {
        type: String,
        required: true
    },

    ReqNumber: {
        type: Number,
        required: true
    },

    ReqObject: {
        type: Number,
        required: true
    },
    ReqId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ReqDate: {
        type: Date,
        required: true
    }

}

module.exports = CommonTypes