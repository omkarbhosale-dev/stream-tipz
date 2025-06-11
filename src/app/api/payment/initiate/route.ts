import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount, productInfo, firstName, email, phone, message } =
      await req.json();

    const txnid = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const merchantKey = process.env.PAYU_MERCHANT_KEY!;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT!;
    const baseUrl = process.env.PAYU_BASE_URL!;

    const validatedFirstName = firstName || "Anonymous";
    const validatedEmail = email || "test@example.com";
    const udf1 = message ? message.substring(0, 255) : "No message";
    const udf2 = "";
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`;
    const failureUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/failure`;

    const hashString = `${merchantKey}|${txnid}|${amount}|${productInfo}|${validatedFirstName}|${validatedEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${merchantSalt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    console.log("hashString:", hashString);
    console.log("Generated hash:", hash);

    return NextResponse.json({
      url: `${baseUrl}/_payment`,
      params: {
        key: merchantKey,
        txnid,
        amount,
        productinfo: productInfo,
        firstname: validatedFirstName,
        email: validatedEmail,
        phone,
        udf1: message ? message.substring(0, 255) : "No message",
        udf2,
        udf3,
        udf4,
        udf5,
        surl: successUrl,
        furl: failureUrl,
        hash,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
