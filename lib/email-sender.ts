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
}

export async function sendEmail({ subject, html }: SendEmailPayload): Promise<{ success: boolean; message: string; simulated: boolean }> {
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

  try {
    const response = await client.emails.send({
      from: "DNS Sanity Alerts <onboarding@resend.dev>", // Resend free-tier sandbox default sender
      to: ["info@emailapiguy.com", "dannyglix@gmail.com"], // Dispatched to both key service mail and developer inbox
      replyTo: "info@emailapiguy.com",
      subject: subject,
      html: html,
    });

    if (response.error) {
      console.error("[Email Error] Resend returned an error:", response.error);
      return {
        success: false,
        simulated: false,
        message: `Resend Error: ${response.error.message}`,
      };
    }

    console.log("[Email Success] Resend sent email status ID:", response.data?.id);
    return {
      success: true,
      simulated: false,
      message: "Email dispatched successfully via Resend API!",
    };
  } catch (error) {
    console.error("[Email Exception] Failed to send email via Resend:", error);
    return {
      success: false,
      simulated: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
