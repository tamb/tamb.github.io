import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HumanVerificationOverlay } from "@/components/HumanVerificationOverlay";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteMeta } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: {
    default: `${siteMeta.personName} · ${siteMeta.title}`,
    template: `%s · ${siteMeta.personName}`,
  },
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.siteUrl,
    siteName: siteMeta.personName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        <SiteHeader />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <SiteFooter />
        <HumanVerificationOverlay />
      </body>
    </html>
  );
}
