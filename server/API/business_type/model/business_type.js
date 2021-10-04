const mongoose = require('mongoose')

const BusinessTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('BusinessType', BusinessTypeSchema)