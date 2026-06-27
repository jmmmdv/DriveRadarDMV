import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "DriveRadarDMV | Driver Intelligence for DC, Maryland, and Virginia",
  description:
    "DriveRadarDMV helps rideshare, delivery, and professional drivers in the DMV plan smarter shifts with weather, events, airport activity, and demand-zone insights.",
  openGraph: {
    title: "DriveRadarDMV | DMV Driver Intelligence",
    description:
      "Smarter driving decisions for Washington DC, Maryland, and Virginia — weather, events, airports, and demand zones in one view.",
    url: "https://drive-radar-dmv.vercel.app/",
    siteName: "DriveRadarDMV",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
