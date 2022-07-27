import mongoose from "mongoose";

const { model, Schema } = mongoose;

export const playerSchema = new Schema({
  name: String,
  speed: {
    default: 0,
    type: Number,
  },
  wordIndex: {
    default: 0,
    type: Number,
  },
  accuracy: {
    default: 0,
    type: Number,
  },
});

const Player = model("Player", playerSchema);

export default Player;
