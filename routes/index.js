const express = require("express");
const router = express.Router();

const location = require("./location");
const team = require("./team");
const player = require("./player");

router.use("/locations", location);
router.use("/teams", team);
router.use("/players", player);

module.exports = router;
