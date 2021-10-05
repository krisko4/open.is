const userService = require('./user_service')
const ApiError = require('../../errors/ApiError')
const confirmationTokenService = require('../confirmation_token/confirmation_token_service')
const placeService = require('../place/place_service')
const newsService = require('../news/news_service')
const visitService = require('../visit/visit_service')
const opinionService = require('../opinion/opinion_service')

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
       try{
           await userService.deleteAll()
           await confirmationTokenService.deleteTokens()
           await placeService.deleteAll()
           await visitService.deleteVisits()
           await opinionService.deleteOpinions()
           await newsService.deleteNews()
           return res.sendStatus(200)
       }catch(err){
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

    

    getUserById: (req, res) => {
        userService.getUserById()
            .then((user) => res.status(200).json(user))
            .catch(err => res.status(400).json({ error: err }))
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