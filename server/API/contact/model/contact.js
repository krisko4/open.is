const mongoose = require('mongoose')
const {ReqString, ReqDate} = require('../../../helpers/common_types')

const ContactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: ReqString,
    email: ReqString,
    content: ReqString,
    date: ReqDate

})

module.exports = mongoose.model('Contact', ContactSchema)