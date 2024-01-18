const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/error");

async function validateCreateBooking(req, res, next) {
    if (!req.body.flightId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ...ErrorResponse,
            error: new AppError(
                ["FlightId should be present"],
                StatusCodes.BAD_REQUEST
            ),
        });
    }
    if (!req.body.noOfSeats) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ...ErrorResponse,
            error: new AppError(
                ["Please select number of seats to be  booked"],
                StatusCodes.BAD_REQUEST
            ),
        });
    }
    next();
}

module.exports = {
    validateCreateBooking,
};
