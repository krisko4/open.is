const { User } = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ApiError = require('../../errors/ApiError')
const ALREADY_EXISTS_MSG = 'User with this e-mail already exists.'
const INVALID_CREDENTIALS_MSG = 'Invalid credentials'
const USER_INACTIVE_MSG = 'User is inactive'
const emailService = require('../email/email_service')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')


const userService = {

    // checkEmailAvailability: async (email) => {
    //     const duplicateUser = await userService.getUserByEmail(email)
    //     if (duplicateUser ) throw ApiError.internal(ALREADY_EXISTS_MSG)
    //     return duplicateUser
    // },

    validateLoggedUser: async (userData) => {
        const foundUser = await User.findOne({ email: userData['email'] }).exec()
        if (!foundUser) throw ApiError.internal(INVALID_CREDENTIALS_MSG)
        const isPasswordValid = bcrypt.compareSync(userData.password, foundUser.password)
        if (!isPasswordValid) throw ApiError.internal(INVALID_CREDENTIALS_MSG)
        if (!foundUser.isActive) throw ApiError.internal(USER_INACTIVE_MSG)
        return foundUser
    },


    async addUser(userData) {
        const { email, password } = userData
        const duplicateUser = await userService.getUserByEmail(email)
        if (duplicateUser) throw ApiError.internal(ALREADY_EXISTS_MSG)
        userData.password = bcrypt.hashSync(password, 10)
        return new User({
            _id: new mongoose.Types.ObjectId,
            ...userData
        }).save()

    },

    activateUser: async (userId) => {
        const user = await User.findById(userId).exec()
        if (!user) throw new Error(`Cannot activate user. User with id ${user._id} not found.`)
        user.isActive = true
        return user.save()
    },
    getUsers: () => User.find().exec(),
    getUserById: (id) => User.findById(id).exec(),
    deleteAll: () => User.deleteMany().exec(),
    getUserByEmail: (email) => User.findOne({ email: email }).exec(),
    getFullNameById: (id) => User.findById(id, 'firstName lastName').exec(),
    deleteUserById: (id) => User.findByIdAndDelete(id).exec(),
    changeEmail: (id, email) => User.findByIdAndUpdate(id, { email: email }, { new: true }).exec(),

    changeUserData: async (newData, id) => {
        const currentUser = await User.findById(id).exec()
        let emailChanged = false
        if (!currentUser) throw new Error('User not found')
        console.log(currentUser)
        console.log(newData)
        if (newData.password) {
            newData.password = bcrypt.hashSync(newData.password, 10)
        } else {
            delete newData.password
        }
        if (newData.email !== currentUser.email) {
            const duplicateUser = await userService.getUserByEmail(newData.email)
            if (duplicateUser) throw ApiError.internal(ALREADY_EXISTS_MSG)
            const token = await confirmationTokenService.createToken(currentUser['_id'])
            await emailService.sendEmailModificationEmail(
                currentUser.firstName,
                newData.email,
                token.value
            )
            emailChanged = true
        }
        delete newData.email
        const user = await User.findByIdAndUpdate(id, newData, { new: true }).exec()
        return { emailChanged: emailChanged, user: user }
    },

}

module.exports = userService