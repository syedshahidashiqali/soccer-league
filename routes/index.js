const express = require("express");
const router = express.Router();

const location = require("./location");
const team = require("./team");
const player = require("./player");
const goal = require("./goal");

router.use("/locations", location);
router.use("/teams", team);
router.use("/players", player);
router.use("/goals", goal);

module.exports = router;
