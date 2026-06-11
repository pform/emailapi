import type { Metadata } from "next";
import TestClient from "./test-client";

export const metadata: Metadata = {
  title: "Hostinger SMTP Transmission Test | EMAIL API guy",
  description: "Secure, real-time SMTP dispatch sandbox using live Hostinger credentials to troubleshoot mail handshakes.",
};

export default function Page() {
  return <TestClient />;
}
