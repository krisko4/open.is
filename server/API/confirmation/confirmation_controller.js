const confirmationService = require('./confirmation_service')
const ApiError = require('../../errors/ApiError')

const confirmationController = {

    confirmRegistration: async (req, res, next) => {
        const tokenValue = req.params['tokenValue']
        try{
            await confirmationService.confirmRegistration(tokenValue)
            res.status(200).json('Registration confirmed successfully.')
        } catch(err) {
            next(err)
        }
    },

    confirmEmailChange : async (req, res, next) => {
        const {email, tokenValue} = req.params
        try{
            console.log('halko')
            await confirmationService.confirmEmailChange(tokenValue, email)
            res.status(200).json('E-mail change confirmed successfully.')
        } catch(err) {
            next(err)
        }

    }

    
}


module.exports = confirmationController