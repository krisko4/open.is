const axios = require('axios')
const ApiError = require('../errors/ApiError')
const { body } = require('express-validator');
const placeValidator = {

    validatePlaceAddress: async (req, res, next) => {
        const { lat, lng, address } = req.body
        const addressResponse = await axios.get(`https://nominatim.openstreetmap.org//reverse?format=json&lat=${lat}&lon=${lng}`)
        const addressData = addressResponse.data
        if (!addressData.display_name || !addressData.address.postcode || addressData.display_name !== address) return next(ApiError.badRequest('Provided address is invalid'))
        next()
    }
}

module.exports = placeValidator