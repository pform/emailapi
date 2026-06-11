import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/data-store";
import { sendEmail } from "@/lib/email-sender";

export async function POST(req: NextRequest) {
  try {
    const { name, email, domain, productId, productName, productPrice } = await req.json();

    // Basic Validation
    if (!name || !email || !productId) {
      return NextResponse.json(
        { error: "Name, email, and selected package parameters are required." },
        { status: 400 }
      );
    }

    // Pre-generate ID and timestamp to include in telemetry record
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const timestamp = new Date().toISOString();

    const emailSubject = `⚡ SERVICE PURCHASE REQUEST: ${productName} by ${name}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-top: 4px solid #16a34a; border-radius: 8px; padding: 24px; color: #18181b; background-color: #fcfcfc;">
        <h2>DNS Integration Order Logged</h2>
        <p>Full Name: ${name}</p>
        <p>Corporate Email: ${email}</p>
        <p>Target Domain: ${domain || "No domain specified"}</p>
        <p>Selected Service: ${productName}</p>
        <p>Pricing Tier: ${productPrice}</p>
        <p>Invoice Order ID: ${id} • Logged At: ${timestamp}</p>
      </div>
    `;

    const emailStatus = await sendEmail({ subject: emailSubject, html: emailHtml });

    // Save submission locally to submissions.json
    const submission = await saveSubmission({
      id,
      timestamp,
      type: "checkout",
      name,
      email,
      domain,
      productId,
      productName,
      productPrice,
      emailStatus,
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      emailStatus: emailStatus,
    });
  } catch (err) {
    console.error("Error saving checkout submission:", err);
    return NextResponse.json(
      { error: "Internal server exception while dispatching purchase order." },
      { status: 500 }
    );
  }
}
