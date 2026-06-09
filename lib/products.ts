export interface Product {
  id: string;
  name: string;
  type: 'one-time' | 'monthly';
  price: string;
  priceValue: number;
  description: string;
  tag: string;
  guarantee: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "onboarding",
    name: "Technical Onboarding Setup",
    type: "one-time",
    price: "$250 - $500 Setup flat",
    priceValue: 350,
    description: "Custom domain routing, advanced DNS record mapping, and configuring entire GoDaddy or Namecheap backends for a new web portal launch. We establish solid nameserver handshakes so your servers never time out.",
    tag: "One-Time Setup",
    guarantee: "🚀 Done in 24 Hours",
  },
  {
    id: "provisioning",
    name: "Workspace Provisioning Setup",
    type: "one-time",
    price: "$250 - $450 Setup flat",
    priceValue: 300,
    description: "Google Workspace creation, reliable user setup across complex departments, and critical MX, TXT, SPF, and DMARC record generation to completely guarantee your emails don't route directly to recipient junk bins.",
    tag: "One-Time Setup",
    guarantee: "🔒 DMARC Safe Guarantee",
  },
  {
    id: "infrastructure",
    name: "Managed Infrastructure Retainer",
    type: "monthly",
    price: "$50 - $150 / mo retainer",
    priceValue: 99,
    description: "Ongoing continuous DNS administration, domain expiration and renewal management, and active troubleshooting when host providers randomly break. No long support waits.",
    tag: "Monthly Retainer",
    guarantee: "⚙️ Fractional IT Management",
  },
  {
    id: "administration",
    name: "Workspace Administration Retainer",
    type: "monthly",
    price: "$50 - $150 / mo retainer",
    priceValue: 75,
    description: "Seamless addition and removal of employee emails, instantaneous password zeroing, and setting up clean forwarding or alias routing rules as your workforce expands.",
    tag: "Monthly Retainer",
    guarantee: "📬 Admin Delegation Shield",
  }
];
