const mongoose = require('mongoose')
const {format} = require('date-fns')
const confirmationTokenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: String,
    expiresAt: Date,
    createdAt: Date,
    userId : mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('ConfirmationToken', confirmationTokenSchema)