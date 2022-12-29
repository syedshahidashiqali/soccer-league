const Match = require("../models/Match.model");
const mongoose = require("mongoose");
const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
  apiValidationErrors,
} = require("../utils/apiHelpers");

exports.registerMatch = async (req, res) => {
  try {
    const newMatch = await Match.create(req.body);

    await res.status(201).json(apiSuccess("Match added successfully!"));
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

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find({});

    res.status(200).json(apiSuccessWithData("All matches in DB", matches));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

exports.upcomingMatches = async (req, res) => {
  try {
    let matches = await Match.aggregate()
      .match({
        team: mongoose.Types.ObjectId(req.query.teamId),
        match_time: {
          $gte: new Date(Date.now()),
        },
      })
      .lookup({
        from: "teams",
        localField: "team",
        foreignField: "_id",
        as: "team",
      })
      .lookup({
        from: "teams",
        localField: "vs_team",
        foreignField: "_id",
        as: "vs_team",
      })
      .project({
        team: {
          _id: 1,
          team_name: 1,
        },
        vs_team: {
          _id: 1,
          team_name: 1,
        },
        match_location: 1,
        match_time: 1,
      });
    // .lookup({
    //   from: "teams",
    //   localField: "team",
    //   foreignField: "_id",
    //   as: "team_detail",
    // })
    // .lookup({
    //   from: "teams",
    //   localField: "vs_team",
    //   foreignField: "_id",
    //   as: "vs_team_detail",
    // })
    // .addFields({
    //   team_name: "team_detail.team_name",
    //   vs_team_name: "vs_team_detail.team_name",
    // })
    // .project({
    //   team_detail: 0,
    //   vs_team_detail: 0,
    // });

    res.status(200).json(apiSuccessWithData("Upcoming matches", matches));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
