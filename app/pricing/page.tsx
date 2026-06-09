import type { Metadata } from 'next';
import PricingPage from "./pricing-client";

export const metadata: Metadata = {
  title: "Sanity Pricing & ROI Support Cost Estimator",
  description: "Calculate your technical ROI. Estimate custom setup costs for Google Workspace, name server switches, and deliverability protection versus standard loss of productivity. Honest rates.",
  keywords: [
    "DNS consulting rates",
    "Google Workspace admin retainer",
    "DMARC consultant cost",
    "email deliverability audit pricing",
    "domain rescue price estimator"
  ],
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: "Sanity Pricing & ROI Support Cost Estimator | EMAIL API guy",
    description: "Honest human support rates without unannounced subscriptions or hidden locked contracts.",
    url: "https://emailapiguy.com/pricing",
  }
};

export default function Page() {
  return <PricingPage />;
}
