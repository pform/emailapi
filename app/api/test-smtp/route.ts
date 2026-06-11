import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      host = "smtp.hostinger.com",
      port = 465,
      secure = true,
      authEmail = "info@emailapiguy.com",
      password,
      senderName = "Email API Guy Tester",
      clientName,
      clientEmail,
      clientDomain,
      clientMessage,
    } = body;

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing password",
          message: "Please enter your Hostinger email password in the input field.",
        },
        { status: 400 }
      );
    }

    // 1. Create nodemailer transporter with Hostinger settings
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Boolean(secure),
      auth: {
        user: authEmail,
        pass: password,
      },
      tls: {
        // Do not fail on invalid certs (makes setup more robust)
        rejectUnauthorized: false,
      },
    });

    // 2. Perform connection/authentication test
    try {
      await transporter.verify();
    } catch (verifyError: any) {
      console.error("[SMTP Verify Error]:", verifyError);
      return NextResponse.json({
        success: false,
        phase: "verify_connection",
        error: verifyError.message || String(verifyError),
        code: verifyError.code,
        message: `Failed to connect/authenticate to ${host}:${port}. Verify your email password is correct.`,
      });
    }

    // 3. Compose the diagnostic email
    const mailOptions = {
      from: `"${senderName}" <${authEmail}>`,
      to: authEmail, // send to self to verify delivery
      replyTo: clientEmail || authEmail,
      subject: `🚨 SMTP TEST INQUIRY: ${clientDomain || "No Domain Specified"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 12px; background-color: #fafafa;">
          <h2 style="color: #1d4ed8; font-weight: 800; border-bottom: 2px solid #e1e1e1; padding-bottom: 10px; margin-top: 0;">
            📬 Hostinger SMTP Live Test Success
          </h2>
          <p style="font-size: 14px; color: #555;">
            This email was sent using the live Hostinger SMTP settings on your server.
          </p>
          
          <div style="background-color: #fff; border: 1px solid #e1e1e1; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h3 style="font-size: 13px; text-transform: uppercase; color: #888; font-family: monospace; margin-top: 0;">
              Contact Form Details:
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; width: 120px;">Client Name:</td>
                <td style="padding: 5px 0; color: #333;">${clientName || "(Not provided)"}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Client Email:</td>
                <td style="padding: 5px 0; color: #333;"><a href="mailto:${clientEmail}">${clientEmail || "(Not provided)"}</a></td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Broken Domain:</td>
                <td style="padding: 5px 0; color: #1d4ed8; font-family: monospace;">${clientDomain || "(Not provided)"}</td>
              </tr>
            </table>

            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dotted #e1e1e1;">
              <strong style="font-size: 11px; text-transform: uppercase; color: #888;">Message Notes:</strong>
              <blockquote style="margin: 8px 0 0 0; padding-left: 10px; border-left: 3px solid #16a34a; font-style: italic; color: #444; font-size: 13.5px; white-space: pre-wrap;">${clientMessage || "(None entered)"}</blockquote>
            </div>
          </div>
          
          <div style="font-size: 11px; color: #a1a1aa; text-align: center; border-top: 1px solid #e1e1e1; padding-top: 10px; margin-top: 20px;">
            Connection settings: host=${host} | port=${port} | user=${authEmail}
          </div>
        </div>
      `,
    };

    // 4. Send the mail
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "SMTP handoff successful! An email was sent to info@emailapiguy.com via your Hostinger SMTP server.",
      messageId: info.messageId,
      accepted: info.accepted,
      response: info.response,
    });
  } catch (err: any) {
    console.error("[SMTP Root Route Error]:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || String(err),
        message: "An unexpected error occurred during the SMTP transmission phase.",
      },
      { status: 500 }
    );
  }
}
