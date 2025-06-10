import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Streamer from "@/models/streamer.model";
import { connectToDatabase } from "@/db";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const formData = await req.formData();
  console.log("Received form data:", Object.fromEntries(formData.entries()));

  const amount = formData.get("amount")?.toString();
  const firstname = formData.get("firstname")?.toString() || "Anonymous";
  const message = formData.get("message")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const productinfo = formData.get("productinfo")?.toString();

  // Validate required fields
  if (!amount || !productinfo) {
    console.error("Missing required fields: amount or productinfo");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
      { status: 302 }
    );
  }

  // Extract the streamer username from productInfo
  const streamerUsername = productinfo.split(" ")[1];

  if (!streamerUsername) {
    console.error("Streamer username not found in productinfo");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
      { status: 302 }
    );
  }

  try {
    // Fetch streamer data from MongoDB
    const streamer = await Streamer.findOne({
      username: streamerUsername,
    }).lean();

    if (!streamer || !streamer.jwtToken) {
      console.error("Streamer JWT not found for username:", streamerUsername);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        { status: 302 }
      );
    }

    console.log("Sending tip alert to StreamElements v3 API...");

    // Use the correct StreamElements v3 API endpoint
    const channelId = streamer.channelId;

    const tipData = {
      user: {
        userId: `custom_${Date.now()}`, // Generate a unique user ID
        username: firstname,
        email: email || `${firstname.toLowerCase()}@external.com`, // Email is required
      },
      provider: "streamtipz", // or "paypal", "stripe", etc.
      message: message,
      amount: Number(amount),
      currency: "INR",
      imported: true, // Mark as imported/external donation
    };

    const options = {
      method: "POST",
      url: `https://api.streamelements.com/kappa/v2/tips/${channelId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; charset=utf-8, application/json",
        Authorization: `Bearer ${streamer.jwtToken}`,
      },
      data: tipData,
      timeout: 15000, // 15 second timeout
    };

    try {
      const response = await axios.request(options);
      console.log(
        "StreamElements tip alert sent successfully:",
        response.status,
        response.data
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        { status: 302 }
      );
    } catch (streamElementsError) {
      console.error("StreamElements API error:", {
        status: streamElementsError.response?.status,
        statusText: streamElementsError.response?.statusText,
        data: streamElementsError.response?.data,
        message: streamElementsError.message,
      });

      // Check if it's an authentication error
      if (streamElementsError.response?.status === 401) {
        console.error(
          "Authentication failed - JWT token may be expired or invalid"
        );

        // Optionally, you could try to refresh the token here
        // or mark the streamer's token as invalid in the database

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure?error=auth`,
          { status: 302 }
        );
      }

      // Check if it's a channel not found error
      if (streamElementsError.response?.status === 404) {
        console.error(
          "Channel not found - channelId may be incorrect:",
          channelId
        );

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure?error=channel`,
          { status: 302 }
        );
      }

      // Check if it's a validation error
      if (streamElementsError.response?.status === 400) {
        console.error(
          "Validation error - check required fields:",
          streamElementsError.response.data
        );
      }

      // For other errors, still redirect to success since payment was processed
      // but add a query parameter to indicate notification failed
      console.log(
        "StreamElements notification failed but payment was successful"
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?notification=failed`,
        { status: 302 }
      );
    }
  } catch (dbError) {
    console.error("Database error:", dbError);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
      { status: 302 }
    );
  }
}

// Helper function to test StreamElements API connection
export async function testStreamElementsAPI(
  jwtToken: string,
  channelId: string
) {
  const testData = {
    user: {
      userId: "test_user_123",
      username: "TestUser",
      email: "test@example.com",
    },
    provider: "external",
    message: "Test donation",
    amount: 1,
    currency: "INR",
    imported: true,
  };

  const options = {
    method: "POST",
    url: `https://api.streamelements.com/kappa/v3/tips/${channelId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; charset=utf-8, application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    data: testData,
    timeout: 10000,
  };

  try {
    const response = await axios.request(options);
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      error: error.response?.data || error.message,
    };
  }
}

// Helper function to validate JWT token format
export function validateJWTToken(token: string): boolean {
  if (!token) return false;

  // Basic JWT format check (should have 3 parts separated by dots)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Try to decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));

    // Check if token has required StreamElements fields
    return !!(payload.channel && payload.role && payload.exp);
  } catch (e) {
    return false;
  }
}
