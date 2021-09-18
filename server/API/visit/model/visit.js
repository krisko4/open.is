const mongoose = require('mongoose')
const {ReqDate, ReqNumber} = require('../../../helpers/common_types')

const VisitSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: ReqDate,
    placeId: mongoose.Schema.Types.ObjectId,
    visitCount: ReqNumber
})

module.exports = mongoose.model('Visit', VisitSchema)