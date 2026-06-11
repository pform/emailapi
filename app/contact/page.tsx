import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Get in Touch | EMAIL API guy",
  description: "Reach Chester Carlson directly for manual DNS calibrations, SPF repair operations, configuration alignment, and email deliverability troubleshooting.",
  keywords: [
    "Contact EMAIL API guy",
    "Chester Carlson contact details",
    "DNS support inquiry",
    "manual SPF DKIM audit",
    "email deliverability technician support"
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Chester Carlson | EMAIL API guy Support",
    description: "Get in touch directly with Chester Carlson for manual DNS audits and custom email deliverability setups.",
    url: "https://emailapiguy.com/contact",
    siteName: "EMAIL API guy",
    type: "website",
  }
};

export default function Page() {
  return <ContactClient />;
}
