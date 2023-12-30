const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
    res.status(200).json({
        success: true,
        data: {},
        error: {},
    });
});

module.exports = {
    v1Routes: router,
};
