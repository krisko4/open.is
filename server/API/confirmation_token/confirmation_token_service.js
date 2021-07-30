const { v4: uuidv4 } = require('uuid');
const ConfirmationToken = require('./model/confirmation_token')
const mongoose = require('mongoose')
const {addMinutes} = require('date-fns')
const confirmationTokenService = {
    createToken:  (userId) => {
        const createdAt = new Date()
        const expiresAt = addMinutes(createdAt, 10)
        const confirmationToken = new ConfirmationToken({
            _id: new mongoose.Types.ObjectId,
            value: uuidv4(),
            createdAt: createdAt,
            expiresAt: expiresAt,
            userId: userId
        })
        return confirmationToken.save()
    },
    confirmToken: async (tokenValue) => {
        const token = await ConfirmationToken.findOne({value: tokenValue}).exec()
        if(!token){
            throw 'Provided token is invalid.'
        }
        const hasTokenExpired = new Date() > token.expiresAt
        if(hasTokenExpired){
            throw 'Provided token has expired.'
        }
        return token.userId
        //return ConfirmationToken.updateOne({_id: token._id}, {value: 'siemanko'})

    },
    getTokens: () => {
        return ConfirmationToken.find().exec()
    },
    deleteTokens: () => {
        return ConfirmationToken.deleteMany()
    },
    deleteToken: async (tokenValue) => {
        const token = await ConfirmationToken.findOne({value: tokenValue}).exec()
        return ConfirmationToken.deleteOne(token)
    }
}

module.exports = confirmationTokenService