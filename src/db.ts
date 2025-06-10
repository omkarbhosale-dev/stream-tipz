import mongoose from "mongoose";

export const connectToDatabase = async () => {
  // Safely get MONGODB_URI (works in all Next.js environments)
  const MONGODB_URI =
    process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI not defined. Please add it to your environment variables."
    );
  }

  // Use existing connection if available
  if (mongoose.connection?.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("✅ Database connected");
    return conn;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error("Database connection failed");
  }
};
