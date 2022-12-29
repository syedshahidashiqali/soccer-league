const express = require("express");
const router = express.Router();

const {
  registerPlayer,
  getAllPlayers,
  getAllPlayersByTeam,
} = require("../controllers/player");

router.post("/register", registerPlayer);
router.get("/", getAllPlayers);
router.get("/:teamId", getAllPlayersByTeam);

module.exports = router;
