const confirmationService = require('./confirmation_service')

const confirmationController = {

    confirmRegistration: async (req, res) => {
        const tokenValue = req.params['tokenValue']
        try{
            await confirmationService.confirmRegistration(tokenValue)
            res.status(200).json('Registration confirmed successfully.')
        } catch(err) {
            console.log(err)
            res.status(400).json({error: err})
        }
    },


}

module.exports = confirmationController