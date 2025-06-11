// app/api/streamer/update/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Streamer from "@/models/streamer.model";
import { connectToDatabase } from "@/db";
import { updateStreamerParams } from "@/types";

export async function POST(req: Request) {
  console.log("🔔 [API] Hitting update streamer route");
  await connectToDatabase();

  const session = await auth();
  console.log("✅ Session:", session);

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "User not authenticated." },
      { status: 401 }
    );
  }

  const body = await req.json();
  console.log("📝 Body received:", body);
  const { displayName, bio, upiId } = body;

  const parsed = updateStreamerParams.safeParse({ displayName, bio, upiId });
  if (!parsed.success) {
    return NextResponse.json({
      success: false,
      message: parsed.error.errors[0].message,
    });
  }

  try {
    const updated = await Streamer.findOneAndUpdate(
      { userId: session.user.id },
      {
        displayName: parsed.data.displayName,
        bio: parsed.data.bio,
        upiId: parsed.data.upiId,
      },
      { new: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error updating streamer: " + error,
    });
  }
}
