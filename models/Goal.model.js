const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
