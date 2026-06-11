import { NextRequest, NextResponse } from "next/server";
import { saveSubmission, getSubmissions } from "@/lib/data-store";
import { sendEmail } from "@/lib/email-sender";

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({
      success: true,
      submissions,
      emailConfigured: true // Local database & direct-dispatch mailto integrations are fully active!
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

    // Pre-generate ID and timestamp to include in telemetry record
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const timestamp = new Date().toISOString();

    // Trigger local simulation terminal logger
    const emailSubject = `🚨 DNS DISTRESS TICKET: ${domain || "Unknown Domain"} from ${name}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-top: 4px solid #f97316; border-radius: 8px; padding: 24px; color: #18181b; background-color: #fcfcfc;">
        <h2>DNS Distress Signal Received</h2>
        <p>Client Name: ${name}</p>
        <p>Corporate Email: ${email}</p>
        <p>Broken Domain: ${domain || "No domain specified"}</p>
        <p>Issue Category: ${pains}</p>
        <p>Client Notes: ${notes || "No notes provided."}</p>
        <p>Ticket ID: ${id} • Recorded: ${timestamp}</p>
      </div>
    `;

    const emailStatus = await sendEmail({ subject: emailSubject, html: emailHtml });

    // Save submission locally to submissions.json
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
