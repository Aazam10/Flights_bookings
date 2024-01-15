class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.expalanations = message;
    }
}

module.exports = AppError;
