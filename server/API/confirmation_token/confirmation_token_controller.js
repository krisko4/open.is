const confirmationTokenService = require('./confirmation_token_service')

const confirmationTokenController = {

    // confirmToken: (req, res) => {
    //     const tokenValue = req.body.token
    //     try{
    //         confirmationTokenService.confirmToken(tokenValue)
    //     } catch(err) {
    //         res.status(404).json({error: err})
    //     }

    // },
    getTokens: (req, res) => {
        confirmationTokenService.getTokens()
            .then(tokens => res.status(200).json(tokens))
            .catch(err => res.status(400).json({error: err}))
    },
    deleteTokens: (req, res) => {
        confirmationTokenService.deleteTokens()
            .then(() => res.status(200).json('All tokens deleted successfully.'))
            .catch(err => res.status(400).json({error: err}))
    }

}

module.exports = confirmationTokenController