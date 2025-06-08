"use server";
import Streamer from "@/models/streamer.model";
import { connectToDatabase } from "@/db";
import { auth } from "@/auth";
import { onboardingSchema } from "@/schemas/onboarding.schema";
import { OnBoardingParams } from "@/types";

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

  return { upload: upload._doc, success: true };
};

export const getStreamer = async (userId: string) => {
  console.log("getStreamer called with userId:", userId);
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
