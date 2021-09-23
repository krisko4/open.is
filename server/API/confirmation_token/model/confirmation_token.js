const mongoose = require('mongoose')

const ConfirmationTokenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: String,
    expiresAt: Date,
    createdAt: Date,
    userId : mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('ConfirmationToken', ConfirmationTokenSchema)