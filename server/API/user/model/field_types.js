const userValidator = require('./user_validator')
const mongoose = require('mongoose')


const fieldTypes = {

    NameString: {
        type: String,
        required: true,
        validate: [userValidator.validateName, 'Name field should not contain numbers.']
    },
    Password: {
        type: String,
        required: true,
        validate: [userValidator.validatePassword, 'Password is invalid. It should contain at least 8 digits, one capital letter, one special sign and one number.']
    },
    Email: {
        required: true,
        type: String,
        unique: true,
        validate: [userValidator.validateEmail, 'E-mail is invalid.']
    },
    DefaultBoolean: {
        type: Boolean,
        default: false
    },
    Image: {
        type: String,
        default: ''
    },
    Subscription: {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place"
        }
    }


}


module.exports = fieldTypes