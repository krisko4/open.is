

class ApiError extends Error {
    constructor(code, message) {
        super()
        this.code = code
        this.message = message
    }

    static badRequest(msg) {
        return new ApiError(400, msg)
    }

    static internal(msg) {
        return new ApiError(500, msg)
    }
}

module.exports = ApiError