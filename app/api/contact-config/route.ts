import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "contact-form-config.json");

export async function GET() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const content = fs.readFileSync(CONFIG_PATH, "utf8");
      return NextResponse.json(JSON.parse(content || "{}"));
    }
  } catch (error) {
    console.error("Error reading contact-form-config.json:", error);
  }
  return NextResponse.json({ configured: false });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formId, responderUri, creatorEmail } = body;

    if (!formId || !responderUri) {
      return NextResponse.json({ success: false, error: "Missing formId or responderUri" }, { status: 400 });
    }

    const config = {
      configured: true,
      formId,
      responderUri,
      creatorEmail: creatorEmail || "info@emailapiguy.com",
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    console.error("Error writing contact-form-config.json:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      fs.unlinkSync(CONFIG_PATH);
    }
    return NextResponse.json({ success: true, message: "Reset successful" });
  } catch (error: any) {
    console.error("Error deleting contact-form", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
