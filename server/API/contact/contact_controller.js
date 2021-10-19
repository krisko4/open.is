const contactService = require('./contact_service')

const contactController = {
    sendMessage: async (req, res, next) => {
        try{
            await contactService.sendMessage(req,body)
            return res.sendStatus(200)
        }catch(err){
            return next(err)
        }
    }
}

module.exports = contactController