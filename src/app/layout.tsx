import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://testcenter.app";
const SITE_DESCRIPTION =
  "TestCenter is an educational knowledge-sharing platform where students and educators share study materials, notes, and interactive quizzes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TestCenter",
    template: "%s · TestCenter",
  },
  description: SITE_DESCRIPTION,
  applicationName: "TestCenter",
  keywords: [
    "quizzes",
    "study materials",
    "flashcards",
    "education",
    "knowledge sharing",
    "exam prep",
    "notes",
    "PDF",
    "learning",
  ],
  authors: [{ name: "TestCenter" }],
  creator: "TestCenter",
  openGraph: {
    type: "website",
    siteName: "TestCenter",
    title: "TestCenter",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TestCenter — Educational knowledge-sharing platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@testcenter",
    title: "TestCenter",
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
