import { NextRequest, NextResponse } from "next/server";
import { saveSubmission, getSubmissions } from "@/lib/data-store";
import { sendEmail } from "@/lib/email-sender";

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({
      success: true,
      submissions,
      emailConfigured: !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== "" && !process.env.RESEND_API_KEY.startsWith("MY_"))
    });
  } catch (err) {
    console.error("Error reading contact submissions:", err);
    return NextResponse.json(
      { error: "Failed to retrieve local submissions payload." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, domain, pains, notes } = await req.json();

    // Basic Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email fields are required core metrics." },
        { status: 400 }
      );
    }

    // Pre-generate ID and timestamp to include in email template
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const timestamp = new Date().toISOString();

    // Send Email
    const emailSubject = `🚨 DNS DISTRESS TICKET: ${domain || "Unknown Domain"} from ${name}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-top: 4px solid #f97316; border-radius: 8px; padding: 24px; color: #18181b; background-color: #fcfcfc;">
        <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #f97316; text-transform: uppercase; font-family: monospace; letter-spacing: 1px;">
          DNS Distress Signal Received
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #3f3f46;">
          A client has logged an official help ticket via the <strong>Email API Guy</strong> portal.
        </p>
        
        <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 13px;">
          <h3 style="margin-top: 0; font-size: 14px; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px; color: #27272a;">
            Ticket Parameters
          </h3>
          <p style="margin: 6px 0;"><strong>Client Name:</strong> ${name}</p>
          <p style="margin: 6px 0;"><strong>Corporate Email:</strong> <a href="mailto:${email}" style="color: #e55b00; text-decoration: none;">${email}</a></p>
          <p style="margin: 6px 0;"><strong>Broken Domain:</strong> <code style="background-color: #e4e4e7; padding: 2px 4px; font-family: monospace; border-radius: 3px;">${domain || "No domain specified"}</code></p>
          <p style="margin: 6px 0;"><strong>Current Host Devastation:</strong> <span style="text-transform: uppercase; font-family: monospace; color: #ea580c; font-weight: bold;">${pains}</span></p>
        </div>
        
        <div style="background-color: #fffaf0; border: 1px solid #ffedd5; border-radius: 6px; padding: 16px; font-size: 13px; margin: 20px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #ea580c; border-bottom: 1px solid #fed7aa; padding-bottom: 6px;">
            Client's Core Panic Notes
          </h3>
          <p style="margin: 6px 0; line-height: 1.6; white-space: pre-wrap;">${notes || "No notes provided."}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 11px; text-align: center; color: #71717a; font-family: monospace;">
          Ticket ID: ${id} • Recorded: ${timestamp}
        </div>
      </div>
    `;

    const emailStatus = await sendEmail({ subject: emailSubject, html: emailHtml });

    // Save submission locally
    const submission = await saveSubmission({
      id,
      timestamp,
      type: "contact",
      name,
      email,
      domain,
      pains,
      notes,
      emailStatus,
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      emailStatus: emailStatus,
    });
  } catch (err) {
    console.error("Error saving contact submission:", err);
    return NextResponse.json(
      { error: "Internal server exception while dispatching telemetry." },
      { status: 500 }
    );
  }
}
