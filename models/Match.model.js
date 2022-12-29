const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    vs_team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    won_team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      // required: true,
    },
    match_location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    match_time: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
