import "./globals.css";

export const metadata = {
  title: "DriveRadarDMV | DMV Driving Intelligence",
  description:
    "DriveRadarDMV is an MVP preview for Washington DC, Maryland, and Virginia drivers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
