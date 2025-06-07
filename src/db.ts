import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to database. \n\n" + error);
  }
};
