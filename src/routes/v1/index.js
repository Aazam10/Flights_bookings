const express = require("express");
const router = express.Router();
const { bookingRoutes } = require("./booking-routes");

router.use("/booking", bookingRoutes);

module.exports = {
    v1Routes: router,
};
