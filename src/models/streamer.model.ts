import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";

// ... rest of your code remains the same

// Define interface for the Streamer document
interface IStreamer extends Document {
  username: string;
  displayName: string;
  jwtToken: string;
  channelId: string;
  bio: string;
  upiId: string;
  userId: string;
}

const streamerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    jwtToken: { type: String, required: true },
    channelId: { type: String, required: true },
    bio: { type: String, required: true },
    upiId: { type: String, required: true },
    userId: { type: String, required: true },
    tip: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Fix the model creation to handle Next.js hot reloading
let Streamer: Model<IStreamer>;

try {
  // Try to get existing model first
  Streamer = mongoose.model<IStreamer>("Streamer");
} catch {
  // If model doesn't exist, create it
  Streamer = mongoose.model<IStreamer>("Streamer", streamerSchema);
}

export default Streamer;
