import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GaziOS | Gazi Faysal Jubayer - Portfolio",
  description: "A Windows 11 themed portfolio website for Gazi Faysal Jubayer - Mechanical Engineer & Full-Stack Developer",
  keywords: ["portfolio", "mechanical engineer", "developer", "Next.js", "React", "Windows 11"],
  authors: [{ name: "Gazi Faysal Jubayer" }],
  creator: "Gazi Faysal Jubayer",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GaziOS | Portfolio",
    description: "Interactive Windows 11 themed portfolio",
    siteName: "GaziOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "GaziOS | Portfolio",
    description: "Interactive Windows 11 themed portfolio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f3f3" },
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
