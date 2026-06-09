import type { Metadata } from 'next';
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Get Rescued | Submit Broken DNS Distress Ticket",
  description: "Stop screaming in GoDaddy automated support chats. Submit your custom Google Workspace, registrar integration blockages, or DNS deliverability panic parameters directly for professional human response. No synthetic bots.",
  keywords: [
    "DNS distress ticket",
    "GoDaddy support alternative",
    "Squarespace domains help",
    "Namecheap DNS reset",
    "DKIM header validation help",
    "Emergency SPF configuration"
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Get Rescued | Submit Broken DNS Distress Ticket",
    description: "Submit your registrar routing problems or email deliverability issues for immediate professional configuration.",
    url: "https://emailapiguy.com/contact",
  }
};

export default function Page() {
  return <ContactPage />;
}
