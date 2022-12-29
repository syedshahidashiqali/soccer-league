const express = require("express");
const router = express.Router();

const location = require("./location");
const team = require("./team");
const player = require("./player");
const goal = require("./goal");
const match = require("./match");

router.use("/locations", location);
router.use("/teams", team);
router.use("/players", player);
router.use("/goals", goal);
router.use("/matches", match);

module.exports = router;
