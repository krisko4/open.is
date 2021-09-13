const mongoose = require('mongoose')
const {ReqId, ReqDate } = require('../../../helpers/common_types')

const OpinionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: ReqDate,
    content: String,
    note: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    placeId: ReqId

    })

module.exports = mongoose.model('Opinion', OpinionSchema)