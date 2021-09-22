const axios = require('axios')

const validatePlaceAddress = async (req, res, next) => {
    const { lat, lng, address } = req.body
    try {
        const addressResponse = await axios.get(`https://nominatim.openstreetmap.org//reverse?format=json&lat=${lat}&lon=${lng}`)
        const addressData = addressResponse.data
        if (!addressData.display_name || !addressData.address.postcode || addressData.display_name !== address) return res.status(400).json('Provided address is invalid')
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

module.exports = validatePlaceAddress