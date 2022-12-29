const express = require("express");
const router = express.Router();

const {
  registerTeam,
  getAllTeams,
  getTeamPerformance,
} = require("../controllers/team");

router.post("/register", registerTeam);
router.get("/", getAllTeams);
router.get("/performance/:teamId", getTeamPerformance);

module.exports = router;
