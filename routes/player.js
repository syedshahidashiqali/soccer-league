const express = require("express");
const router = express.Router();

const { registerPlayer, getAllPlayers } = require("../controllers/player");

router.post("/register", registerPlayer);
router.get("/", getAllPlayers);

module.exports = router;
