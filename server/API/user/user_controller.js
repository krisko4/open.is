const userService = require('./user_service')
const ApiError = require('../../errors/ApiError')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const placeService = require('../place/place_service')
const newsService = require('../news/news_service')
const visitService = require('../visit/visit_service')
const opinionService = require('../opinion/opinion_service')
const userDto = require('./model/user_dto')

const userController = {

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
            const result = await userService.changeUserData(req.body, id)
            return res.status(200).json({emailChanged: result.emailChanged, user: userDto(result.user)})
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
            console.log(req.params)
            console.log(id)
            const user = await userService.getUserById(id)
            return res.status(200).json(userDto(user))
        } catch (err) {
            return next(err)
        }
    },

    getFullNameById: (req, res) => {
        console.log(req.params)
        userService.getFullNameById(req.params.userId)
            .then(fullName => {
                res.status(200).json(fullName)
            })
            .catch(err => res.status(400).json({ error: err }))
    }


}

module.exports = userController