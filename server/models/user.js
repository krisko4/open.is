const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    secondName: String
})

module.exports = mongoose.model('User', userSchema)