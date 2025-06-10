import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";

// ... rest of your code remains the same

// Define interface for the Streamer document
interface ITransaction extends Document {
  streamerId: string;
  tipperName: string;
  tipperEmail: string;
  amount: number;
  message: string;
  tnxId: string;
}

const transactionSchema = new mongoose.Schema(
  {
    streamerId: { type: String, required: true, unique: true },
    tipperName: { type: String, required: true },
    tipperEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String, required: true },
    tnxId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// Fix the model creation to handle Next.js hot reloading
let Transaction: Model<ITransaction>;

try {
  // Try to get existing model first
  Transaction = mongoose.model<ITransaction>("Transaction");
} catch {
  // If model doesn't exist, create it
  Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
}

export default Transaction;
