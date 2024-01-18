const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createBooking(req, res) {
    try {
        const booking = await BookingService.createBooking({
            flightId: req.body.flightId,
            noOfSeats: req.body.noOfSeats,
            userId: req.body.userId,
        });
        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            data: booking,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error: error,
        });
    }
}

module.exports = {
    createBooking,
};
