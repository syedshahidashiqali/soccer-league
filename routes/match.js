const express = require("express");
const router = express.Router();

const {
  registerMatch,
  getAllMatches,
  upcomingMatches,
} = require("../controllers/match");

router.post("/register", registerMatch);
router.get("/", getAllMatches);
router.get("/upcoming", upcomingMatches);

module.exports = router;
