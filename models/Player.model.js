const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Goal = require("./Goal.model");

const playerSchema = new Schema(
  {
    player_name: {
      type: String,
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    appearances: {
      type: Number,
      default: 0,
    },
    assists: {
      type: Number,
      default: 0,
    },
    cross_accuracy: {
      type: Number,
      default: 0,
    },
    key_passes: {
      type: Number,
      default: 0,
    },
    tackles: {
      type: Number,
      default: 0,
    },
    // goals: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Goal",
    // },
  },
  { timestamps: true }
);

// playerSchema.virtual("goals", {
//   ref: Goal,
//   localField: "_id",
//   foreignField: "player",
//   count: true,
// });

module.exports = mongoose.model("Player", playerSchema);
