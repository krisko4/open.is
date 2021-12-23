const { User } = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ApiError = require('../../errors/ApiError')
const ALREADY_EXISTS_MSG = 'User with this e-mail already exists.'
const INVALID_CREDENTIALS_MSG = 'Invalid credentials'
const USER_INACTIVE_MSG = 'User is inactive'
const emailService = require('../email/email_service')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const cloudinary = require('../../config/cloudinary')

const userService = {

    // checkEmailAvailability: async (email) => {
    //     const duplicateUser = await userService.getUserByEmail(email)
    //     if (duplicateUser ) throw ApiError.internal(ALREADY_EXISTS_MSG)
    //     return duplicateUser
    // },

    addSubscription: async (locationId, placeId, uid) => {
        const user = await User.findById(uid).lean().exec()
        if (!user) throw ApiError.internal(`User with uid: ${uid} not found.`)
        const { subscriptions } = user
        let subs = []
        if (!subscriptions) {
            subs.push({
                place: placeId,
                subscribedLocations: [locationId]
            })
        }
        else {
            subs = [...subscriptions]
            if (!subs.some(sub => sub.place.toString() === placeId.toString())) {
                subs.push({
                    place: placeId,
                    subscribedLocations: [locationId]
                })
            }
            else {
                const isAlreadySubscribed = subs.some(sub => sub.subscribedLocations.some(loc => loc.toString() === locationId))
                if (isAlreadySubscribed) throw ApiError.internal('User is already a subscriber of this location')
                const { subscribedLocations } = subs.find(sub => sub.place.toString() === placeId.toString())
                subscribedLocations.push(locationId)
            }
        }
        return User.findByIdAndUpdate(uid, { 'subscriptions': subs }, { new: true, upsert: true }).exec()
    },

    validateLoggedUser: async (userData) => {
        const foundUser = await User.findOne({ email: userData['email'] }).exec()
        if (!foundUser) throw ApiError.internal(INVALID_CREDENTIALS_MSG)
        const isPasswordValid = bcrypt.compareSync(userData.password, foundUser.password)
        if (!isPasswordValid) throw ApiError.internal(INVALID_CREDENTIALS_MSG)
        if (!foundUser.isActive) throw ApiError.internal(USER_INACTIVE_MSG)
        return foundUser
    },


    async addUser(userData, session) {
        const { email, password } = userData
        const duplicateUser = await userService.getUserByEmail(email)
        if (duplicateUser) throw ApiError.internal(ALREADY_EXISTS_MSG)
        userData.password = bcrypt.hashSync(password, 10)
        return new User({
            _id: new mongoose.Types.ObjectId,
            ...userData
        }).save({ session })

    },


    activateUser: async (userId) => {
        const user = await User.findById(userId).exec()
        if (!user) throw new Error(`Cannot activate user. User with id ${user._id} not found.`)
        user.isActive = true
        return user.save()
    },
    getSubscriptions: async (id) => {
        const user = await User.findById(id).lean().populate('subscriptions.place').exec()
        const subscriptions = user.subscriptions.map(subscription => {
            const locations = subscription.place.locations.filter(location => subscription.subscribedLocations.some(id => id.toString() === location._id.toString()))
            subscription.place.locations = locations
            return { ...subscription.place }
        })
        return subscriptions
    },
    getSubscribedLocations: async (id) => {
        const user = await User.findById(id).lean().exec()
        let subscribedLocations = []
        if(user.subscriptions){
            user.subscriptions.forEach(sub => subscribedLocations = subscribedLocations.concat(sub.subscribedLocations))
        }
        return subscribedLocations
    },

    isUserSubscriber: async (locationId, uid) => {
        if (uid) {
            const subscribedLocations = await userService.getSubscribedLocations(uid)
            return subscribedLocations && subscribedLocations.some(loc => loc._id.toString() === locationId.toString())
        }
        return false
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
        if (newData.password) {
            newData.password = bcrypt.hashSync(newData.password, 10)
        } else {
            delete newData.password
        }
        let user
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            if (newData.email !== currentUser.email) {
                const duplicateUser = await userService.getUserByEmail(newData.email)
                if (duplicateUser) throw ApiError.internal(ALREADY_EXISTS_MSG)
                const token = await confirmationTokenService.createToken(currentUser['_id'], session)
                await emailService.sendEmailModificationEmail(
                    currentUser.firstName,
                    newData.email,
                    token.value
                )
                emailChanged = true
            }
            delete newData.email
            // upload image to cloudinary
            if (newData.img) {
                if (currentUser.img) {
                    await cloudinary.uploader.destroy(currentUser.img)
                }
                const uploadResponse = await cloudinary.uploader.upload(newData.img.tempFilePath, {
                    upload_preset: 'user_images'
                })
                newData.img = uploadResponse.public_id
            }
            user = await User.findByIdAndUpdate(id, newData, { new: true, session: session }).exec()

        })
        await session.endSession()
        return { emailChanged: emailChanged, user: user }
    },

}

module.exports = userService