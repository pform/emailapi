export interface SendEmailPayload {
  subject: string;
  html: string;
  to?: string[];
}

export async function sendEmail({ subject, html, to }: SendEmailPayload): Promise<{ success: boolean; message: string; simulated: boolean; errorDetails?: any }> {
  // Resend API is completely bypassed and purged as requested.
  // This function now strictly handles local sandbox simulation logging.
  console.log("\n================ [TELEMETRY RECORD LOGGED] ================");
  console.log(`Subject: "${subject}"`);
  console.log("----------------------------------------------------------");
  // Strip HTML tags for clean internal terminal readability
  const cleanLogs = html.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, " ").trim();
  console.log(`Content Body: ${cleanLogs}`);
  console.log("================= [TELEMETRY RECORD END] =================\n");

  return {
    success: true,
    simulated: true,
    message: "Resend module is completely bypassed. Telemetry successfully captured locally to server logs.",
  };
}
