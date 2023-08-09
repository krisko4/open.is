const mongoose = require('mongoose')
const {ReqString, ReqDate} = require('../../../helpers/common_types')

const NewsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: ReqString,
    date: ReqDate,
    content: ReqString,
    locationId: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('News', NewsSchema)