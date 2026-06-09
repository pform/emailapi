import type { Metadata } from "next";
import HomePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Professional DNS, Domain & Google Workspace Support | EMAIL API guy",
  description: "Instant, professional human DNS support, robust SPF/DKIM key validation, and custom Google Workspace integrations. Rebuild deliverability values with zero robo-chat wait walls.",
  keywords: [
    "DNS configuration specialist",
    "Google Workspace admin service",
    "email deliverability audit",
    "SPF DKIM DMARC records setup",
    "domain mapping custom expert",
    "GoDaddy DNS rescue",
    "Namecheap DNS routing advice",
    "Squarespace custom domains setup help"
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Professional DNS, Domain & Google Workspace Support | EMAIL API guy",
    description: "Rebuild your deliverability with solid SPF, DKIM, and DMARC handshakes. Expert human support with zero robo-chat lines.",
    url: "https://emailapiguy.com",
    siteName: "EMAIL API guy",
    type: "website",
  }
};

export default function Page() {
  return <HomePageClient />;
}
