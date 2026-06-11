import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (key && key.trim() !== "" && !key.startsWith("MY_")) {
      resendClient = new Resend(key);
    }
  }
  return resendClient;
}

export interface SendEmailPayload {
  subject: string;
  html: string;
  to?: string[];
}

export async function sendEmail({ subject, html, to }: SendEmailPayload): Promise<{ success: boolean; message: string; simulated: boolean }> {
  const client = getResendClient();
  if (!client) {
    const msg = "RESEND_API_KEY is not defined in the environment. Email delivery is simulated on the server. Please add your Resend API secret to send emails.";
    console.warn("\n================ [EMAIL SIMULATION START] ================");
    console.warn(`Subject: "${subject}"`);
    console.warn("----------------------------------------------------------");
    // Strip HTML tags for readable CLI logging
    const cleanLogs = html.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, " ").trim();
    console.warn(`Content: ${cleanLogs}`);
    console.warn("================= [EMAIL SIMULATION END] =================\n");
    return {
      success: true,
      simulated: true,
      message: msg,
    };
  }

  const primaryRecipients = to || ["dannyglix@gmail.com", "info@emailapiguy.com"];
  const fallbackRecipients = ["dannyglix@gmail.com"]; // Guaranteed account owner email

  try {
    console.log(`[Email Attempt 1] Dispatching to primary list: ${primaryRecipients.join(", ")}`);
    const response = await client.emails.send({
      from: "DNS Sanity Alerts <onboarding@resend.dev>", // Resend free-tier sandbox default sender
      to: primaryRecipients,
      replyTo: "info@emailapiguy.com",
      subject: subject,
      html: html,
    });

    if (!response.error) {
      console.log("[Email Success] Resend sent email status ID:", response.data?.id);
      return {
        success: true,
        simulated: false,
        message: `Email dispatched successfully to ${primaryRecipients.join(", ")}!`,
      };
    }

    // Attempt 1 failed! Let's examine the error and invoke the account owner fallback route
    console.warn("[Email Attempt 1 Failed] Primary dispatch failed:", response.error);
    console.log(`[Email Attempt 2] Activating sandbox fallback. Dispatching only to: ${fallbackRecipients.join(", ")}`);

    const fallbackResponse = await client.emails.send({
      from: "onboarding@resend.dev",
      to: fallbackRecipients,
      replyTo: "info@emailapiguy.com",
      subject: `[SANDBOX FLOW] ${subject}`,
      html: `
        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 14px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; color: #78350f; line-height: 1.5;">
          <strong style="color: #d97706; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">📂 Resend Sandbox Fallback Triggered</strong>
          This email was safely re-routed to your registered owner account address (<strong style="color: #1e293b;">dannyglix@gmail.com</strong>) because Resend rejected the primary list. 
          To send emails to secondary external addresses like <strong style="color: #1e293b;">info@emailapiguy.com</strong>, please verify the <code style="background-color: #f3f4f6; padding: 2px 4px; font-family: monospace; border-radius: 4px; font-size: 11px;">emailapiguy.com</code> domain in your Resend Dashboard.
        </div>
        ${html}
      `,
    });

    if (fallbackResponse.error) {
      console.error("[Email Fallback Failed] Both attempts failed. Resend error:", fallbackResponse.error);
      return {
        success: false,
        simulated: false,
        message: `Primary list failed (${response.error.message}) & fallback failed (${fallbackResponse.error.message}).`,
      };
    }

    console.log("[Email Fallback Success] Fallback sent successfully:", fallbackResponse.data?.id);
    return {
      success: true,
      simulated: false,
      message: "Sandbox delivery: primary failed verification. Safely rerouted to your verified owner inbox!",
    };

  } catch (error) {
    console.error("[Email Exception] Exception during send:", error);
    
    // Exception fallback
    try {
      console.log(`[Email Attempt 2 (Exception Fallback)] Retrying fallback to: ${fallbackRecipients.join(", ")}`);
      const fallbackResponse = await client.emails.send({
        from: "onboarding@resend.dev",
        to: fallbackRecipients,
        replyTo: "info@emailapiguy.com",
        subject: `[RESEND FALLBACK] ${subject}`,
        html: html,
      });

      if (!fallbackResponse.error) {
        return {
          success: true,
          simulated: false,
          message: "Primary threw exception. Safely routed to fallback owner inbox!",
        };
      }
    } catch (fallbackErr) {
      console.error("[Email Fallback Exception] Critical exception during fallback retry:", fallbackErr);
    }

    return {
      success: false,
      simulated: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
