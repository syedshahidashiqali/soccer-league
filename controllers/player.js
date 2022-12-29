const Player = require("../models/Player.model");

const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
  apiValidationErrors,
} = require("../utils/apiHelpers");

exports.registerPlayer = async (req, res) => {
  try {
    const newPlayer = Player.create(req.body);

    res.status(201).json(apiSuccess("Player has been registered!"));
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

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({});

    res.status(200).json(apiSuccessWithData("All players in DB", players));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
