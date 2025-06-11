import { NextResponse } from "next/server";
import Transaction from "@/models/transaction.model";
import { connectToDatabase } from "@/db";

export async function POST(req: Request) {
  await connectToDatabase();
  const { timeFilter } = await req.json();

  const now = new Date();
  let startDate: Date;
  let endDate: Date = now;

  if (timeFilter === "this-week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    startDate = startOfWeek;
  } else if (timeFilter === "last-week") {
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    startOfLastWeek.setHours(0, 0, 0, 0);
    endOfLastWeek.setHours(23, 59, 59, 999);
    startDate = startOfLastWeek;
    endDate = endOfLastWeek;
  } else if (timeFilter === "this-month") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    startDate = startOfMonth;
  } else {
    // All time
    startDate = new Date(0);
  }

  try {
    const leaderboard = await Transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$streamerId",
          transactionCount: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          transactionCount: -1,
        },
      },
      {
        $lookup: {
          from: "streamers", // collection name must match MongoDB collection
          localField: "_id",
          foreignField: "userId", // assuming you use `userId` in Streamer model
          as: "streamer",
        },
      },
      {
        $unwind: "$streamer",
      },
      {
        $project: {
          _id: 0,
          streamerId: "$_id",
          transactionCount: 1,
          totalAmount: 1,
          name: "$streamer.displayName",
          avatar: "$streamer.avatarUrl",
          category: "$streamer.category",
          isVerified: "$streamer.isVerified",
          followers: "$streamer.followers",
        },
      },
    ]);

    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching leaderboard", error },
      { status: 500 }
    );
  }
}
