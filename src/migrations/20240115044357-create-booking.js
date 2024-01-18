"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utils/common");
const { BOOKED, INITIATED, CANCELLED } = Enums.BOOKING_STATUS;
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookingRef: {
                type: Sequelize.STRING,
            },
            flightNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            noOfSeats: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            status: {
                type: Sequelize.ENUM,
                values: [BOOKED, INITIATED, CANCELLED],
                defaultValue: INITIATED,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            totalCost: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Bookings");
    },
};
