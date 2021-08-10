const mongoose = require('mongoose')
const {ReqString} = require('../../../helpers/common_types')

const refreshTokenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: ReqString,
    userId : mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)