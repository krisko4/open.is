const axios = require('axios')
const ApiError = require('../errors/ApiError')
const placeValidator = {
    validatePlaceAddress: async (req, res, next) => {
        const { locations } = req.body
        for (const location of locations) {
            const { addressId, addressLanguage } = location
            const addressResponse = await axios.get(`https://nominatim.openstreetmap.org/lookup?osm_ids=${addressId}&format=json&accept-language=${addressLanguage}`)
            const addressData = addressResponse.data[0]
            location.address = addressData.display_name
            if (
                !addressData.display_name ||
                !addressData.address.postcode
            )
                return next(ApiError.badRequest('Provided address is invalid'))
        }
        next()
    }
}

module.exports = placeValidator