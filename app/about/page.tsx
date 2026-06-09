import type { Metadata } from "next";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About Chester Carlson | EMAIL API guy",
  description: "Learn the backstory of Chester Carlson, Chief DNS Rescue Officer. From electrostatic copier pioneering to modern SPF/DKIM electronic deliverability restoration.",
  keywords: [
    "Chester Carlson story",
    "EMAIL API guy history",
    "DNS deliverability officer",
    "manual SPF DKIM calibration expert",
    "Xerographic electronic email routing"
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Chester Carlson | Chief DNS Rescue Officer",
    description: "Discover how the pioneer of xerography digitized his electrostatic charge principles to solve modern SMTP, Google Workspace, and DNS delivery failures manually.",
    url: "https://emailapiguy.com/about",
    siteName: "EMAIL API guy",
    type: "website",
  }
};

export default function Page() {
  return <AboutPageClient />;
}
