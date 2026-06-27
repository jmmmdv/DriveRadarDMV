import "./globals.css";

export const metadata = {
  title: "DriveRadarDMV | Driver Intelligence for DC, Maryland, and Virginia",
  description:
    "DriveRadarDMV is a coming-soon driver intelligence platform for Washington, DC, Maryland, and Virginia."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
