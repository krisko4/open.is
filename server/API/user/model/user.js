const mongoose = require('mongoose')
const { NameString, Email, Password, DefaultBoolean, Image, Subscription } = require('./field_types')
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true)



const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: NameString,
    lastName: NameString,
    email: Email,
    password: Password,
    isActive: DefaultBoolean,
    img: Image,
    subscriptions: [{
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        },
        locationId : {
            type : mongoose.Schema.Types.ObjectId
        }
    }
    ]
})

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema)

module.exports = {
    User,
    UserSchema
}