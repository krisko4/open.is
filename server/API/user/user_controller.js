const userService = require('./user_service')
const ApiError = require('../../errors/ApiError')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const placeService = require('../place/place_service')
const newsService = require('../news/news_service')
const visitService = require('../visit/visit_service')
const opinionService = require('../opinion/opinion_service')
const userDto = require('./dto/user_dto')
const greet = require('../../firebase/notifications/greet')

const userController = {

    updateProfilePicture: async (req, res, next) => {
        const { uid } = req.cookies
        const { id } = req.params
        if (uid !== id) return next(ApiError.badRequest('Invalid uid'))
        const newImage = req.file
        try {
            const updatedUser = await userService.updateProfilePicture(uid, newImage)
            return res.status(200).json(updatedUser)
        } catch (err) {
            return next(err)
        }

    },

    async checkIfUserIsSubscriber(req, res, next) {
        const { uid } = req.cookies
        const { id, locationId } = req.params
        if (uid !== id) return next(ApiError.badRequest('Invalid uid'))
        try{
            const isUserSubscriber = await userService.checkIfUserIsSubscriber(uid, locationId)
            return res.status(200).json(isUserSubscriber)
        }catch(err){
            return next(err)
        }

    },

    removeProfilePicture: async (req, res, next) => {
        const { uid } = req.cookies
        const { id } = req.params
        if (uid !== id) return next(ApiError.badRequest('Invalid uid'))
        try {
            const updatedUser = await userService.removeProfilePicture(uid)
            return res.status(200).json(updatedUser)
        } catch (err) {
            return next(err)
        }

    },

    removeSubscription: async (req, res, next) => {
        const { locationId, id } = req.params
        const { uid } = req.cookies
        if (uid !== id) return next(ApiError.badRequest('Invalid uid'))
        try {
            const place = await placeService.findByLocationId(locationId)
            if (!place) throw ApiError.badRequest('Invalid placeId')
            const updatedUser = await userService.removeSubscription(locationId, place, uid)
            return res.status(200).json(updatedUser)
        } catch (err) {
            return next(err)
        }

    },

    addSubscription: async (req, res, next) => {
        const { id } = req.params
        const { locationId } = req.body
        const { uid, notificationToken } = req.cookies
        if (uid !== id) return next(ApiError.badRequest('Invalid uid'))
        try {
            const place = await placeService.findByLocationId(locationId)
            if (!place) throw ApiError.badRequest('Invalid placeId')
            if (place.userId === uid) throw ApiError.internal('You cannot subscribe to your own place')
            const updatedUser = await userService.addSubscription(locationId, place._id, uid)
            greet(notificationToken);
            return res.status(200).json(updatedUser)
        } catch (err) {
            return next(err)
        }
    },

    getUsers: (req, res, next) => {
        userService.getUsers()
            .then(users => res.status(200).json(users))
            .catch(err => next(err))
    },

    addUser: (req, res, next) => {
        delete req.body.confirmPassword
        delete req.body.confirmEmail
        userService.addUser(req.body)
            .then(user => res.status(201).json({ message: 'New user added successfully.', user }))
            .catch(err => next(err))
    },

    deleteAll: async (req, res, next) => {
        try {
            await userService.deleteAll()
            await confirmationTokenService.deleteTokens()
            await placeService.deleteAll()
            await visitService.deleteVisits()
            await opinionService.deleteOpinions()
            await newsService.deleteNews()
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    },


    changeUserData: async (req, res, next) => {
        try {
            const { password } = req.body
            if (password === undefined) throw ApiError.badRequest('Password is required')
            const { uid } = req.cookies
            const { id } = req.params
            if (uid !== id) throw new Error('Uids are different')
            const userData = { ...req.body }
            const result = await userService.changeUserData(userData, id)
            return res.status(200).json({ emailChanged: result.emailChanged, user: userDto(result.user) })
        } catch (err) {
            return next(err)
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) throw ApiError.badRequest('userId is required')
            await userService.deleteUserById(id)
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    },



    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params
            console.log(id)
            const user = await userService.getUserById(id)
            return res.status(200).json(userDto(user))
        } catch (err) {
            return next(err)
        }
    },

    getFullNameById: (req, res, next) => {
        console.log(req.params)
        userService.getFullNameById(req.params.userId)
            .then(fullName => {
                res.status(200).json(fullName)
            })
            .catch(err => next(err))
    }


}

module.exports = userController