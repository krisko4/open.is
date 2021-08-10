const userService = require('./user_service')



const userController = {

    getUsers: (req, res) => {
        userService.getUsers()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).json({error: err}))
    },

    addUser: (req, res) => {
        try {
            userService.addUser(req.body)
                .then(user => res.status(201).json({message: 'New user added successfully.', user}))
                .catch(err => res.json({error: err}))
        } catch (err) {
            res.status(400).json({error : err})
        }

    },

    deleteAllUsers: (req, res) => {
        userService.deleteAllUsers()
            .then(() => res.status(200).json('All users deleted successfully'))
            .catch(err => res.status(400).json({error: err}))
    },

    getUserById: (req, res) => {
        userService.getUserById()
            .then((user) => res.status(200).json(user))
            .catch(err => res.status(400).json({error: err}))
    }


}

module.exports = userController