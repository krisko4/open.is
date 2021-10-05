const {User} = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ApiError = require('../../errors/ApiError')
const ALREADY_EXISTS_MSG = 'User with this e-mail already exists.'
const INVALID_CREDENTIALS_MSG = 'Invalid credentials'
const USER_INACTIVE_MSG = 'User is inactive'


const userService = {

   checkEmailAvailability: async(email) => {
        const duplicateUser = await userService.getUserByEmail(email)
        if(duplicateUser && duplicateUser['isActive']) throw ApiError.internal(ALREADY_EXISTS_MSG)
        return duplicateUser
    },

    validateLoggedUser: async(userData) => {
        const foundUser = await User.findOne({email: userData['email']}).exec()
        if(!foundUser) throw new Error(INVALID_CREDENTIALS_MSG)
        const isPasswordValid = bcrypt.compareSync(userData.password, foundUser.password)
        if(!isPasswordValid) throw new Error(INVALID_CREDENTIALS_MSG)
        if(!foundUser.isActive) throw ApiError.internal(USER_INACTIVE_MSG)
        return foundUser
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
        if(!user) throw new Error(`Cannot activate user. User with id ${user._id} not found.`)
        user.isActive = true
        return user.save()
    },
    getUsers: () => User.find().exec(),
    getUserById: (id) => User.findById(id).exec(),
    deleteAll: () => User.deleteMany().exec(),
    getUserByEmail: (email) => User.findOne({email: email}).exec(),
    getFullNameById : (id) => User.findById(id, 'firstName lastName').exec(),
    deleteUserById: (id) => User.findByIdAndDelete(id).exec()

}

module.exports = userService