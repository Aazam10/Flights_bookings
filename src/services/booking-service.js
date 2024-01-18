const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const { AppError } = require("../utils/error");
const { v4: uuidv4 } = require("uuid");
const { BookingRepository } = require("../repository");
const { ServerConfig } = require("../config");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await fetch(
            `${ServerConfig.FLIGHT_SERVICE}/flight/${data.flightId}`
        );
        const json = await flight.json();
        if (json.data.totalSeats < data.noOfSeats) {
            throw new AppError(
                ["Not enough seats left in the selected airplane"],
                StatusCodes.BAD_REQUEST
            );
        }
        const totalCost = data.noOfSeats * json.data.price;
        const bookingPayload = {
            flightNumber: json.data.flightNumber,
            bookingRef: uuidv4(),
            noOfSeats: data.noOfSeats,
            userId: data.userId,
            totalCost,
        };

        const booking = await bookingRepository.createBooking(
            bookingPayload,
            transaction
        );

        await fetch(
            `${ServerConfig.FLIGHT_SERVICE}/flight/${data.flightId}/seats`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    seats: data.noOfSeats,
                    dec: true,
                }),
            }
        );

        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        if (error instanceof AppError) throw error;
        throw new AppError(
            ["Something went wrong"],
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

// async function cancelBooking (data) {

// }

module.exports = {
    createBooking,
};
