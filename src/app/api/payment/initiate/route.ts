import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount, productInfo, firstName, email, phone } = await req.json();

    const txnid = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const merchantKey = process.env.PAYU_MERCHANT_KEY!;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT!;
    const baseUrl = process.env.PAYU_BASE_URL!;

    const validatedFirstName = firstName || "Anonymous";
    const validatedEmail = email || "test@example.com";

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`;
    const failureUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/failure`;

    const hashString = `${merchantKey}|${txnid}|${amount}|${productInfo}|${validatedFirstName}|${validatedEmail}|||||||||||${merchantSalt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

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
