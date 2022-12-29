const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Goal = require("./Goal.model");

const teamSchema = new Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    shots_pg: {
      type: Number,
      default: 0,
    },
    discipline: {
      type: Number,
      default: 0,
    },
    possession: {
      type: Number,
      default: 0,
    },
    pass: {
      type: Number,
      default: 0,
    },
    aerials_won: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

teamSchema.virtual("total_goals", {
  ref: Goal,
  localField: "_id",
  foreignField: "player",
  count: true,
});

module.exports = mongoose.model("Team", teamSchema);
