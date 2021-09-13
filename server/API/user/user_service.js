const {User} = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const EMAIL_ERROR_MSG = 'E-mails are different.'
const PASSWORD_ERROR_MSG = 'Passwords are different.'
const ALREADY_EXISTS_MSG = 'User with this e-mail already exists.'
const INVALID_CREDENTIALS_MSG = 'Invalid credentials'


const userService = {

    validateRegisteredUser: async(userData) => {
        const duplicateUser = await User.findOne({email: userData['email']}).exec()
        if(duplicateUser){
            if(!duplicateUser['isActive']){
                return duplicateUser
            }
            throw ALREADY_EXISTS_MSG
        }
        return duplicateUser
    },

    validateLoggedUser: async(userData) => {
        const duplicateUser = await User.findOne({email: userData['email']}).exec()
        if(!duplicateUser) throw INVALID_CREDENTIALS_MSG
        const isPasswordValid = bcrypt.compareSync(userData.password, duplicateUser.password)
        if(!isPasswordValid) throw INVALID_CREDENTIALS_MSG
        return duplicateUser
    },

    async addUser(userData) {
        const areEmailsEqual = userData['email'] === userData['confirmEmail']
        const arePasswordsEqual = userData['password'] === userData['confirmPassword']
        if(!areEmailsEqual || !arePasswordsEqual){
            throw !areEmailsEqual ? EMAIL_ERROR_MSG : PASSWORD_ERROR_MSG
        }
        const duplicateUser =  await this.validateRegisteredUser(userData)
        if(duplicateUser) return duplicateUser
        delete userData['confirmPassword']
        delete userData['confirmEmail']
        userData.password = bcrypt.hashSync(userData.password, 10)
        const user = new User({
            _id: new mongoose.Types.ObjectId,
            ...userData
        })
        console.log(user)
        return user.save()
    },
    activateUser: async (userId) => {
        const user = await User.findById(userId).exec()
        if(!user){
            throw `Cannot activate user. User with id ${user._id} not found.`
        }
        user.isActive = true
        return user.save()
    },
    getUsers: () => User.find().exec(),
    getUserById: (id) => User.findById(id).exec(),
    deleteAll: () => User.deleteMany().exec(),
    getUserByEmail: (email) => User.findOne({email: email}).exec(),
    getFullNameById : (id) => User.findById(id, 'firstName lastName').exec()

}

module.exports = userService