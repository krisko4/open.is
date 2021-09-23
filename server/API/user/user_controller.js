const userService = require('./user_service')
const ApiError = require('../../errors/ApiError')


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

    deleteAll: (req, res, next) => {
        userService.deleteAll()
            .then(() => res.status(200).json('All users deleted successfully'))
            .catch(err => next(err))
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