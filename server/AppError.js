class AppError extends Error {
    constructor(message, status) {
        super()
        this.name = 'App Error'
        this.message = message
        this.status = status
    }
}

module.exports = AppError