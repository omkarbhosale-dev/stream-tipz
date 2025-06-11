"use server";
import Streamer from "@/models/streamer.model";
import { connectToDatabase } from "@/db";
import { auth } from "@/auth";
import { onboardingSchema } from "@/schemas/onboarding.schema";
import { OnBoardingParams, UpdateStreameType } from "@/types";

export const onBoardingAction = async ({
  params,
}: {
  params: OnBoardingParams;
}) => {
  connectToDatabase();
  const session = (await auth()) as { user?: { id: string } } | null;

  if (!session?.user?.id) {
    throw new Error("User session is not available.");
  }

  // ✅ Validate with Zod
  const parsed = onboardingSchema.safeParse(params);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message, // You can collect all errors too
    };
  }

  // ✅ Check for username duplication
  const existing = await Streamer.findOne({ username: params.username });
  if (existing) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  const upload = await Streamer.create({
    ...parsed.data,
    userId: session.user.id,
  });

  return { upload: upload.toObject(), success: true };
};

export const getStreamer = async (userId: string) => {
  // console.log("getStreamer called with userId:", userId);
  connectToDatabase();

  try {
    const existing = await Streamer.findOne({ userId: userId }).lean();
    console.log("Fetched Streamer:", existing);

    if (existing) {
      return {
        success: true,
        data: existing,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    console.error("getStreamer error:", error);
    return {
      success: false,
      data: null,
    };
  }
};

export const getStreamerUsername = async (username: string) => {
  // console.log("getStreamer called with userId:", userId);
  connectToDatabase();

  try {
    const existing = await Streamer.findOne({ username: username }).lean();
    console.log("Fetched Streamer:", existing);

    if (existing) {
      return {
        success: true,
        data: existing,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    console.error("getStreamer error:", error);
    return {
      success: false,
      data: null,
    };
  }
};

// increment the tip of a streamer!

export const incrementTip = async (userId: string) => {
  connectToDatabase();

  try {
    const streamer = await Streamer.findOneAndUpdate(
      { userId: userId },
      { $inc: { tip: 1 } },
      { new: true }
    ).lean();

    if (streamer) {
      return {
        success: true,
        data: streamer,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    console.error("incrementTip error:", error);
    return {
      success: false,
      data: null,
    };
  }
};

export const updateStreamer = async (params: { params: UpdateStreameType }) => {
  connectToDatabase();

  const { bio, displayName, upiId } = params.params;

  const session = (await auth()) as { user?: { id: string } } | null;
  if (!session?.user?.id) {
    throw new Error("User session is not available.");
  }
  try {
    // ✅ Validate with Zod
    const parsed = onboardingSchema.safeParse({
      displayName,
      bio,
      upiId,
    });
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.errors[0].message, // You can collect all errors too
      };
    }
    // ✅ Check for username duplication
    const data = await Streamer.findOneAndUpdate(
      {
        userId: session.user.id,
      },
      {
        displayName: parsed.data.displayName,
        bio: parsed.data.bio,
        upiId: parsed.data.upiId,
      },
      {
        new: true, // Return the updated document
      }
    ).lean();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating streamer " + error,
    };
  }
};
