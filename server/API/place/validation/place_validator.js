const axios = require('axios')
const ApiError = require('../../../errors/ApiError')
const { body } = require('express-validator');
const placeValidator = {

    validatePlaceAddress: async (req, res, next) => {
        const { lat, lng, address } = req.body
        const addressResponse = await axios.get(`https://nominatim.openstreetmap.org//reverse?format=json&lat=${lat}&lon=${lng}`)
        const addressData = addressResponse.data
        if (!addressData.display_name || !addressData.address.postcode || addressData.display_name !== address) return next(ApiError.badRequest('Provided address is invalid'))
        next()
    },
    validateUploadedImage: async (req, res, next) => {
        if (Object.keys(req.files).length !== 1) return next(ApiError.badRequest('One image file is required and only one is allowed.'))
        if (!req.files.img) return next(ApiError.badRequest('Image file not found in uploaded form.'))
        const image = req.files.img
        console.log(image)
        if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') return next(ApiError.badRequest((`Invalid file type. Accepted file types: png, jpg, jpeg`)))
        next()
    },
    validateImageOnEdit: async (req, res, next) => {
        
        if(req.files){
            placeValidator.validateUploadedImage(req, res, next)
            return
        }
        const placesUrl = `${process.env.BASE_URL}/images/places/`
        if(!req.body.img.startsWith(`${process.env.BASE_URL}/images/places/`)) return next(ApiError.badRequest('Invalid img'))
        req.body.img = req.body.img.substring(placesUrl.length)
    
    }

}


module.exports = placeValidator