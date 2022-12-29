const Location = require("../models/Location.model");

const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
  apiValidationErrors,
} = require("../utils/apiHelpers");

exports.registerLocation = async (req, res) => {
  try {
    const location = await Location.create({
      location: req.body.location,
    });

    await res.status(201).json(apiSuccess("Location added successfully!"));
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json(apiValidationErrors(messages));
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});

    res.status(200).json(apiSuccessWithData("All Locations", locations));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    res.status(200).json(apiSuccessWithData("Location", location));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, {
      location: req.body.location,
    });

    res.status(200).json(apiSuccess("Location updated successfully!"));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    res.json(apiSuccessWithData("Location deleted successfully!", location));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
