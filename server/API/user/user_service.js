const User = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const EMAIL_ERROR_MSG = 'E-mails are different.'
const PASSWORD_ERROR_MSG = 'Passwords are different.'

const userService = {

    addUser: (userData) => {

        const areEmailsEqual = userData['email'] === userData['confirmEmail']
        const arePasswordsEqual = userData['password'] === userData['confirmPassword']
        if(!areEmailsEqual || !arePasswordsEqual){
            throw !areEmailsEqual ? EMAIL_ERROR_MSG : PASSWORD_ERROR_MSG
        }
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
    deleteAllUsers: () => User.deleteMany().exec()

}

module.exports = userService