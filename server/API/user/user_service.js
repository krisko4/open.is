const {User} = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ApiError = require('../../errors/ApiError')
const ALREADY_EXISTS_MSG = 'User with this e-mail already exists.'
const INVALID_CREDENTIALS_MSG = 'Invalid credentials'


const userService = {

   checkEmailAvailability: async(email) => {
        const duplicateUser = await userService.getUserByEmail(email)
        if(duplicateUser && duplicateUser['isActive']) throw ApiError.internal(ALREADY_EXISTS_MSG)
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
        const {email, password} = userData
        const duplicateUser =  await this.checkEmailAvailability(email)
        if(duplicateUser) return duplicateUser
        userData.password = bcrypt.hashSync(password, 10)
        return new User({
            _id: new mongoose.Types.ObjectId,
            ...userData
        }).save()
       
    },
    activateUser: async (userId) => {
        const user = await User.findById(userId).exec()
        if(!user) throw `Cannot activate user. User with id ${user._id} not found.`
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