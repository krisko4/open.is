const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    type: String,
    lat: Number,
    lng: Number,
    description: String,
    status: String
    }
)

module.exports = mongoose.model('Place', placeSchema)