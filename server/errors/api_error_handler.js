const ApiError = require('./ApiError')

const apiErrorHandler = (err, req, res, next) => {

    console.log(err.stack)

    if (err instanceof ApiError) {
        switch (err.code) {
            case 403:
                console.log(err.message)
                return res.status(err.code).json('Forbidden')
            default:
                return res.status(err.code).json(err.message)
        }
    }

    res.status(500).json('something went wrong')

}

module.exports = apiErrorHandler