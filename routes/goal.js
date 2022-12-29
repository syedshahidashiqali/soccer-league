const express = require("express");
const router = express.Router();

const { registerGoal, getAllGoals } = require("../controllers/goal");

router.post("/register", registerGoal);
router.get("/", getAllGoals);

module.exports = router;
