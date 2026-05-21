const express = require("express");
const router = express.Router();

router.post("/classify-review", async (req, res) => {
    res.json({
        message: "ML pipeline not connected yet"
    });
});

module.exports = router;