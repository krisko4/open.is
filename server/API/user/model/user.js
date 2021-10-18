const mongoose = require('mongoose')
const {NameString, Email, Password, DefaultBoolean, Image} = require('./field_types')
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true)



const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: NameString,
    lastName: NameString,
    email: Email,
    password: Password,
    isActive: DefaultBoolean,
    img: Image
})

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema)

module.exports = {
    User,
    UserSchema
}