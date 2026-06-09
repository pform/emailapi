import type { Metadata } from 'next';
import ServicesPage from "./services-client";

export const metadata: Metadata = {
  title: "DNS & Email Deliverability Services Setup",
  description: "Browse professional DNS and Workspace setup packages. From custom Google Workspace and Microsoft 365 configurations to DMARC enforcement policies and high-volume deliverability handshakes.",
  keywords: [
    "Google Workspace setup service",
    "DKIM configuration packages",
    "DMARC policy alignment help",
    "SPF record installation",
    "domain mapping expert",
    "DNS service retainer"
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "DNS & Email Deliverability Services Setup | EMAIL API guy",
    description: "Instant access to professional DNS support setups and Workspace domain migrations.",
    url: "https://emailapiguy.com/services",
  }
};

export default function Page() {
  return <ServicesPage />;
}
