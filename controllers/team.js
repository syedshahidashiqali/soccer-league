const Team = require("../models/Team.model");
const mongoose = require("mongoose");

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

    res.status(200).json(apiSuccessWithData("All teams in DB", teams));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

exports.getTeamPerformance = async (req, res) => {
  try {
    const team = await Team.aggregate()
      .match({
        _id: mongoose.Types.ObjectId(req.params.teamId),
      })
      .lookup({
        from: "players",
        localField: "_id",
        foreignField: "team",
        as: "players",
        let: { playerId: "$_id" },
        pipeline: [
          {
            $lookup: {
              from: "goals",
              localField: "_id",
              foreignField: "player",
              as: "goals",
            },
          },
          {
            $addFields: {
              playersGoalsCount: { $size: "$goals" },
            },
          },
          {
            $project: {
              _id: 1,
              player_name: 1,
              team: 1,
              // goals: 1,
              playersGoalsCount: 1,
            },
          },
        ],
      })
      .project({
        _id: 1,
        team_name: 1,
        shots_pg: 1,
        discipline: 1,
        possession: 1,
        pass: 1,
        aerials_won: 1,
        rating: 1,
        players: {
          $filter: {
            input: "$players",
            as: "player",
            cond: { $gt: ["$$player.playersGoalsCount", 0] },
          },
        },
      })
      .project({
        _id: 1,
        team_name: 1,
        shots_pg: 1,
        discipline: 1,
        possession: 1,
        pass: 1,
        aerials_won: 1,
        rating: 1,
        players: 1,
        total_goals: { $size: "$players" },
      });
    //   "childs": {
    //     "$filter": {
    //         "input": "$childs",
    //         "as": "child",
    //         "cond": { "$eq": [ "$$child.value", "1" ] }
    //     }
    //  }
    // .unwind("$players")
    // .match({
    //   "players.playersGoalsCount": 1,
    // })
    // .group({
    //   _id: null,
    //   count: {$count: {}},
    //   // l: "$team",
    //   // id: {"$_id"},
    // });
    // .filter({
    //   input: "$$players",
    //   as: "my_player",
    //   cond: { $gt: ["$$my_player.playersGoalsCount", 0] },
    // });
    // .addFields({
    //   goalsCount12: {$size: "$players.goalsCount"}
    // })

    res.status(200).json(apiSuccessWithData("Team performance", team));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};
