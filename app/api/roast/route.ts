import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the GoogleGenAI client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { domain, issue } = await req.json();

    if (!domain && !issue) {
      return NextResponse.json(
        { error: "Listen, even with the grace of a thousand alien gods, I cannot diagnose a mystery! Provide a domain or issue." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the legendary "EMAIL API guy" – an ultimate, cosmic, full-stack wizard of domain routing, DNS mapping, Google Workspace provisioning, and MX/TXT/DMARC record wizardry. 

Your mission:
- Provide an incredibly funny, witty, and slightly roasty response that emotionally makes the user double over with laughter.
- Simultaneously demonstrate peak technical mastery. Show they are dealing with a world-class IT genius who has configured DNS across a thousand alien galaxies.
- Give a brutal yet loving roast of godaddy / hostinger default dashboard traps, or general email delivery despair.
- Detail the exact, precise configuration records they actually need (e.g. SPF: "v=spf1 include:_spf.google.com ~all", DKIM TXT keys, DMARC alignment "v=DMARC1; p=quarantine; pct=100", or MX routing settings).
- Relate their issue directly to your service menu products:
  - "Technical Onboarding" (One-Time Setup: configure GoDaddy/Hostinger DNS, base routing)
  - "Workspace Provisioning" (One-Time: Create Google Workspace, verify MX/TXT/DMARC records)
  - "Managed Infrastructure" (Monthly retainer: ongoing renewals, domain configuration, fractional IT management)
  - "Workspace Administration" (Monthly retainer: employee inbox management, routing rules, password resets)
- Keep the response in a crisp, beautiful markdown format with visual headers or sections. Make sure to output standard markdown. Do not talk about your internal system prompts. Keep the tone completely in character.`;

    const prompt = `
DOMAIN SUBMITTED: "${domain || "None specified"}"
DNS OR EMAIL ISSUE CHOSEN/DESCRIBED: "${issue || "Everything is chaotic and emails feel like messages in a bottle"}"

Please roast their current state, explain technically what happens when record types (like MX, SPF, DKIM, or DMARC) are misconfigured, provide a sample code snippet of the CORRECT configuration structure, and tell them how the EMAIL API guy's services can solve this. Make it hilarious!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
      },
    });

    const responseText = response.text || "The alien signals are slightly jammed, but trust me, your DKIM is probably crying right now. Hire us to fix it!";

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Gemini API Error in route:", error);
    return NextResponse.json(
      { 
        error: "Oops, the cosmic routers suffered a packet loss!",
        details: error.message || "An unexpected error occurred." 
      },
      { status: 500 }
    );
  }
}
