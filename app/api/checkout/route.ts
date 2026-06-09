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

    // Save submission locally
    const submission = await saveSubmission({
      type: "checkout",
      name,
      email,
      domain,
      productId,
      productName,
      productPrice,
    });

    // Send Email
    const emailSubject = `⚡ SERVICE PURCHASE REQUEST: ${productName} by ${name}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-top: 4px solid #16a34a; border-radius: 8px; padding: 24px; color: #18181b; background-color: #fcfcfc;">
        <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #16a34a; text-transform: uppercase; font-family: monospace; letter-spacing: 1px;">
          DNS Integration Order Logged
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #3f3f46;">
          A new service package purchase authorization has been submitted by a client on <strong>Email API Guy</strong>. No credit card block was requested; direct invoice is requested.
        </p>
        
        <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 13px;">
          <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px; color: #27272a;">
            Customer Parameters
          </h3>
          <p style="margin: 6px 0;"><strong>Full Name:</strong> ${name}</p>
          <p style="margin: 6px 0;"><strong>Corporate Email:</strong> <a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></p>
          <p style="margin: 6px 0;"><strong>Target Domain:</strong> <code style="background-color: #e4e4e7; padding: 2px 4px; font-family: monospace; border-radius: 3px;">${domain || "No domain specified"}</code></p>
        </div>
        
        <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 6px; padding: 16px; font-size: 13px; margin: 20px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #16a34a; border-bottom: 1px solid #bbf7d0; padding-bottom: 6px;">
            Invoiced Package Details
          </h3>
          <p style="margin: 6px 0;"><strong>Selected Service:</strong> <strong>${productName}</strong></p>
          <p style="margin: 6px 0;"><strong>Pricing Tier:</strong> <strong style="font-family: monospace; font-size: 14px; color: #15803d;">${productPrice}</strong></p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 11px; text-align: center; color: #71717a; font-family: monospace;">
          Invoice Order ID: ${submission.id} • Logged At: ${submission.timestamp}
        </div>
      </div>
    `;

    const emailStatus = await sendEmail({ subject: emailSubject, html: emailHtml });

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
