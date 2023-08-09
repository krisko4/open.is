const ApiError = require('../errors/ApiError')

const imageValidator = {

    validateUploadedImages: async (req, res, next) => {
        if (!req.files) return next(ApiError.badRequest('At least one image file is required.'))
        if (Object.keys(req.files).length > 5) return next(ApiError.badRequest('No more than 5 images can be uploaded.'))
        if (!req.files.logo) return next(ApiError.badRequest('Logo is required.'))
        console.log(req.files)
        req.files.forEach(file => {
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') return next(ApiError.badRequest((`Invalid file type. Accepted file types: png, jpg, jpeg`)))
        })
        next()
    },
    validateImageOnEdit: async (req, res, next) => {
        req.files ? imageValidator.validateUploadedImages(req, res, next) : next()
    }


}

module.exports = imageValidator