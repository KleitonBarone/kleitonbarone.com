import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const title = "Kleiton Barone | Senior Software Engineer";
const description =
  "Software engineer in São Paulo with 6+ years of experience. Explore my work in backend engineering, system design, and automation.";
export const metadata: Metadata = {
  metadataBase: new URL("https://kleitonbarone.com"),
  title: { default: title, template: "%s | Kleiton Barone" },
  description,
  openGraph: {
    title, description, type: "website", locale: "en_US",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
