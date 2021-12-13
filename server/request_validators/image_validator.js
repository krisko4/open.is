const ApiError = require('../errors/ApiError')

const imageValidator = {
    
    validateUploadedImage: async (req, res, next) => {
        if(!req.files) return next(ApiError.badRequest('Image file is required.'))
        if (Object.keys(req.files).length !== 1) return next(ApiError.badRequest('One image file is required and only one is allowed.'))
        if (!req.files.img) return next(ApiError.badRequest('Image file not found in uploaded form.'))
        const image = req.files.img
        if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') return next(ApiError.badRequest((`Invalid file type. Accepted file types: png, jpg, jpeg`)))
        next()
    },
    validateImageOnEdit: async (req, res, next) => {
        req.files ? imageValidator.validateUploadedImage(req, res, next) : next()
    }

}

module.exports = imageValidator