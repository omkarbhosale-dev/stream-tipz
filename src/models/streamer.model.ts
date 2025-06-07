import mongoose, { Schema } from "mongoose";

const streamerSchema = new Schema(
  {
    //define schema
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    jwtToken: { type: String, required: true },
    bio: { type: String, required: true },
    upiId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Streamer =
  mongoose.models.Streamer || mongoose.model("Streamer", streamerSchema);
export default Streamer;
