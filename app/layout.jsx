import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

const SITE_URL = "https://drive-radar-dmv.vercel.app/";

const siteTitle = "DriveRadarDMV | DMV Driver Intelligence MVP";
const siteDescription =
  "DMV driver intelligence for rideshare, delivery, Uber Black/SUV, private, and professional drivers. MVP preview with live weather, daily briefing, and static intelligence cards — not official traffic advice or earnings guarantees.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s | DriveRadarDMV"
  },
  description: siteDescription,
  keywords: [
    "DMV driver intelligence",
    "Washington DC rideshare driver",
    "Maryland delivery driver",
    "Virginia Uber driver",
    "Uber Black SUV DMV",
    "private driver Washington DC",
    "airport pickup DCA IAD BWI",
    "driver daily briefing",
    "gig driver weather events",
    "DMV demand zones"
  ],
  authors: [{ name: "DriveRadarDMV", url: SITE_URL }],
  creator: "DriveRadarDMV",
  publisher: "DriveRadarDMV",
  applicationName: "DriveRadarDMV",
  category: "transportation",
  openGraph: {
    title: "DriveRadarDMV | DMV Driver Intelligence MVP",
    description:
      "Smarter shift planning for DMV drivers — weather, events, airports, and demand zones. MVP preview with live NWS weather; other modules use demo cards.",
    url: SITE_URL,
    siteName: "DriveRadarDMV",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "DriveRadarDMV | DMV Driver Intelligence MVP",
    description:
      "DMV driver intelligence for rideshare, delivery, Uber Black/SUV, and professional drivers. MVP preview — not official traffic or earnings advice."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
