import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { RouteFade } from "@/components/RouteFade";
import { Preloader } from "@/components/Preloader";
import { ChatWidget } from "@/components/ChatWidget";
import { PrecisionCursor } from "@/components/PrecisionCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Chester Andaya — Working Record",
  description:
    "Researcher, engineer, builder, leader. ICMCR 2026 (Tokyo) computer vision research, full-stack government systems, and ML products shipped end-to-end.",
  openGraph: {
    title: "Chester Andaya — Working Record",
    description:
      "Researcher, engineer, builder, leader. ICMCR 2026 (Tokyo) computer vision research, full-stack government systems, and ML products shipped end-to-end.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Chester Andaya — Working Record",
    description:
      "Researcher, engineer, builder, leader. ICMCR 2026 (Tokyo) computer vision research, full-stack government systems, and ML products shipped end-to-end.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chester Andaya",
  jobTitle: "Machine Learning Engineer",
  url: SITE_URL,
  email: "mailto:iamchesterandaya@gmail.com",
  sameAs: [
    "https://github.com/itsmeches",
    "https://www.linkedin.com/in/chester-andaya-8bba4a1b9",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University — Lipa",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
      </head>
      <body className="bg-page text-fg antialiased font-sans selection:bg-accent/25">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Preloader />
        <PrecisionCursor />
        <ScrollProgress />
        <RouteFade>{children}</RouteFade>
        <ChatWidget />
      </body>
    </html>
  );
}
