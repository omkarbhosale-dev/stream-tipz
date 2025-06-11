"use server";
import { connectToDatabase } from "@/db";
import Transaction from "@/models/transaction.model";
import { incrementTip } from "./onboarding.acion";

interface FilterOptions {
  streamerId: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export const createTransaction = async ({
  streamerId,
  tipperName,
  tipperEmail,
  amount,
  message,
  tnxId,
}: {
  streamerId: string;
  tipperName: string;
  tipperEmail: string;
  amount: number;
  message: string;
  tnxId: string;
}) => {
  await connectToDatabase();

  try {
    const existing = await Transaction.findOne({ tnxId });

    if (existing) {
      return { success: false, message: "Transaction already exists" };
    }

    const transaction = await Transaction.create({
      streamerId,
      tipperName,
      tipperEmail,
      amount,
      message,
      tnxId,
    });

    const incc = await incrementTip(streamerId);
    console.log("incc", incc);

    return { success: true, data: transaction.toObject() };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? { message: error.message, stack: error.stack }
          : "Unknown error",
    };
  }
};
export const getStreamerTransactions = async (streamerId: string) => {
  await connectToDatabase();

  try {
    const transactions = await Transaction.find({ streamerId }).lean();

    if (transactions.length > 0) {
      return { success: true, data: transactions };
    } else {
      return { success: false, message: "No transactions found" };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? { message: error.message, stack: error.stack }
          : "Unknown error",
    };
  }
};

export const getTransactions = async ({
  streamerId,
  startDate,
  endDate,
  limit = 10,
}: FilterOptions) => {
  try {
    await connectToDatabase();

    const query: Record<string, unknown> = { streamerId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(limit);

    // Calculate aggregated data
    const aggregatedData = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$amount" },
          totalTips: { $sum: 1 },
          averageTip: { $avg: "$amount" },
          highestTip: { $max: "$amount" },
        },
      },
    ]);

    return {
      success: true,
      data: {
        transactions: JSON.parse(JSON.stringify(transactions)),
        aggregatedData: aggregatedData[0] || {
          totalEarnings: 0,
          totalTips: 0,
          averageTip: 0,
          highestTip: 0,
        },
      },
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch transactions",
    };
  }
};
