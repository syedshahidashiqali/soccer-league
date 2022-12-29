const express = require("express");
const router = express.Router();

const {
  registerLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/location");

router.get("/", getAllLocations);
router.get("/:id", getLocation);
router.put("/update/:id", updateLocation);
router.delete("/delete/:id", deleteLocation);
router.post("/register", registerLocation);

module.exports = router;
