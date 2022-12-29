const Goal = require("../models/Goal.model");

const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
  apiValidationErrors,
} = require("../utils/apiHelpers");

exports.registerGoal = async (req, res) => {
  try {
    const newGoal = Goal.create(req.body);

    res.status(201).json(apiSuccess("Gaol has been registered!"));
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

exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});

    res.status(200).json(apiSuccessWithData("All Goals in DB", goals));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
