import Streamer from "@/models/streamer.model";
import { connectToDatabase } from "@/db";

export const getStreamerData = async (username: string) => {
  try {
    await connectToDatabase();

    const existing = await Streamer.findOne({ userId: username }).lean();

    if (existing) {
      return { success: true, data: existing };
    } else {
      return {
        success: false,
        data: null,
        message: "Streamer not found",
      };
    }
  } catch (error) {
    // Return more detailed error information
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : "Unknown error",
    };
  }
};
