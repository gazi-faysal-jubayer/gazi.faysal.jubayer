import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageColorProvider } from "@/components/layout/PageColorProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CustomCursor } from "@/components/motion/CustomCursor";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gazi Faysal Jubayer — Mechanical Engineer & Programmer",
  description:
    "Portfolio of Gazi Faysal Jubayer — mechanical design, CAD, and software development. KUET Mechanical Engineering · 2× NASA Space Apps Galactic Problem Solver.",
  keywords: [
    "portfolio",
    "mechanical engineer",
    "programmer",
    "CAD",
    "SolidWorks",
    "Next.js",
    "React",
    "KUET",
    "NASA Space Apps",
  ],
  authors: [{ name: "Gazi Faysal Jubayer" }],
  creator: "Gazi Faysal Jubayer",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Gazi Faysal Jubayer — Mechanical Engineer & Programmer",
    description:
      "Engineering precision meets digital craft. Mechanical · Code · 2× NASA Space Apps winner.",
    siteName: "Gazi Faysal Jubayer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gazi Faysal Jubayer — Mechanical Engineer & Programmer",
    description:
      "Engineering precision meets digital craft. Mechanical · Code · 2× NASA Space Apps winner.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="grain min-h-screen bg-void font-sans text-bone antialiased">
        <TransitionProvider>
          <SmoothScroll />
          <PageColorProvider />
          <TopBar />
          <ScrollProgress />
          {children}
          <BottomNav />
          <CustomCursor />
        </TransitionProvider>
      </body>
    </html>
  );
}
