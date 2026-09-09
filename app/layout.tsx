import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-public",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zunark-ai.com"),
  title: {
    default: "ZUNARK | Websites, Software, AI & Automation",
    template: "%s",
  },
  description:
    "ZUNARK designs and builds websites, custom software, AI solutions and automation that fit the way your business actually works.",
  openGraph: {
    siteName: "ZUNARK",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
