const Team = require("../models/Team.model");

const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
  apiValidationErrors,
} = require("../utils/apiHelpers");

exports.registerTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    const newTeam = Team.create(req.body);

    res.status(201).json(apiSuccess("Team has been registered!"));
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

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});

    res.status(200).json(apiSuccessWithData("All teams in DB", teams))
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
