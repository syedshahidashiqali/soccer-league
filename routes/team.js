const express = require("express");
const router = express.Router();

const { registerTeam, getAllTeams } = require("../controllers/team");

router.post("/register", registerTeam);
router.get("/", getAllTeams);

module.exports = router;
