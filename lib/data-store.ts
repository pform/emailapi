import fs from "fs";
import path from "path";

export interface Submission {
  id: string;
  type: "contact" | "checkout";
  timestamp: string;
  name: string;
  email: string;
  domain?: string;
  productId?: string;
  productName?: string;
  productPrice?: string;
  pains?: string;
  notes?: string;
  emailStatus?: {
    success: boolean;
    message: string;
    simulated: boolean;
    errorDetails?: any;
  };
}

const STORAGE_PATH = path.join(process.cwd(), "submissions.json");

export async function saveSubmission(data: Omit<Submission, "id" | "timestamp"> & { id?: string; timestamp?: string }): Promise<Submission> {
  const newSubmission: Submission = {
    id: data.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: data.timestamp || new Date().toISOString(),
    ...data,
  };

  try {
    let existing: Submission[] = [];
    if (fs.existsSync(STORAGE_PATH)) {
      const fileContent = fs.readFileSync(STORAGE_PATH, "utf8");
      existing = JSON.parse(fileContent || "[]");
    }
    existing.push(newSubmission);
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(existing, null, 2), "utf8");
    console.log(`[Storage] Saved submission ${newSubmission.id} to ${STORAGE_PATH}`);
  } catch (error) {
    console.error("Local filesystem write failed, attempting /tmp storage fallback:", error);
    try {
      const fallbackPath = path.join("/tmp", "submissions.json");
      let existing: Submission[] = [];
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf8");
        existing = JSON.parse(fileContent || "[]");
      }
      existing.push(newSubmission);
      fs.writeFileSync(fallbackPath, JSON.stringify(existing, null, 2), "utf8");
      console.log(`[Storage] Saved submission ${newSubmission.id} to fallback path ${fallbackPath}`);
    } catch (fallbackError) {
      console.error("Failed to persist submission to /tmp fallback:", fallbackError);
    }
  }

  return newSubmission;
}

export async function getSubmissions(): Promise<Submission[]> {
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      return JSON.parse(fs.readFileSync(STORAGE_PATH, "utf8"));
    }
    const fallbackPath = path.join("/tmp", "submissions.json");
    if (fs.existsSync(fallbackPath)) {
      return JSON.parse(fs.readFileSync(fallbackPath, "utf8"));
    }
  } catch (e) {
    console.error("Failed to read submissions:", e);
  }
  return [];
}
