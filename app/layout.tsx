import type { Metadata } from 'next';
import './globals.css';
import { CheckoutProvider } from "@/lib/checkout-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://emailapiguy.com'),
  title: {
    default: 'EMAIL API guy | Professional DNS, Domain & Google Workspace Support',
    template: '%s | EMAIL API guy'
  },
  description: 'Instant, professional human DNS support and deliverability configuration. Fix broken Google Workspace, SPF, DKIM, DMARC, and custom registrar routing loopholes with zero automated chat wait lines.',
  keywords: [
    'DNS configuration',
    'Google Workspace setup',
    'domain routing verification',
    'email deliverability audit',
    'SPF records',
    'DKIM validation keys',
    'DMARC enforcement protection',
    'GoDaddy DNS rescue',
    'Namecheap support portal',
    'Squarespace MX servers',
    'domain registrar configuration expert'
  ],
  authors: [{ name: 'Chester Carlson', url: 'https://emailapiguy.com' }],
  creator: 'Chester Carlson (EMAIL API guy)',
  publisher: 'EMAIL API guy',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'EMAIL API guy | Expert DNS, Domain & Google Workspace Help',
    description: 'Stop crying on a GoDaddy custom queue. Professional human DNS configuration, SPF/DKIM headers validation, and email deliverability recovery handled with raw technical care.',
    url: 'https://emailapiguy.com',
    siteName: 'EMAIL API guy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMAIL API guy | Professional DNS, Domain & Workspace Rescue',
    description: 'Human DNS configuration, SPF/DKIM validation, and domain rescue with zero robo-chat wait lines.',
    creator: '@dannyglix',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-zinc-50 text-zinc-900 selection:bg-lime-400 selection:text-zinc-950 min-h-screen flex flex-col" suppressHydrationWarning>
        <CheckoutProvider>
          <Navbar />
          <main className="flex-grow relative">
            {children}
          </main>
          <Footer />
        </CheckoutProvider>
      </body>
    </html>
  );
}
