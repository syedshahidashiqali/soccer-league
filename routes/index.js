const express = require("express");
const router = express.Router();

const location = require("./location");

router.use("/locations", location);

module.exports = router;
