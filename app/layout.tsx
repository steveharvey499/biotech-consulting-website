import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Fallback font - Inter will be used until Adobe Fonts are configured
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Note: To use brand fonts (Freight Display Pro & Acumin Pro):
// 1. Get your Adobe Fonts project ID from https://fonts.adobe.com
// 2. Add the kit link to styles/globals.css (replace @import with your kit URL)
// 3. Update CSS variables below with the correct font-family names from Adobe Fonts
// For now, Inter serves as a fallback that closely matches Acumin Pro

export const metadata: Metadata = {
  title: "Steve Harvey | Biotech CEO Consultant & Executive Coach",
  description:
    "In today’s funding climate, it’s never been more critical to reach your first $1M. Expert technical and strategic guidance for biotech founders navigating from bench to revenue generation.",
  keywords: [
    "biotech consultant",
    "CEO coaching",
    "life sciences consulting",
    "biotech scaling",
    "synthetic biology",
    "pharmaceutical partnerships",
    "biotech revenue growth",
  ],
  authors: [{ name: "Steve Harvey" }],
  openGraph: {
    title: "Steve Harvey | Biotech CEO Consultant & Executive Coach",
    description:
      "Expert guidance for founders navigating the complex journey of building revenue-generating biotech companies.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Harvey | Biotech CEO Consultant & Executive Coach",
    description:
      "Expert guidance for founders navigating the complex journey of building revenue-generating biotech companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {hubspotPortalId && (
          <Script
            id="hubspot-tracking"
            strategy="afterInteractive"
            src={`//js.hs-scripts.com/${hubspotPortalId}.js`}
          />
        )}
      </body>
    </html>
  );
}
