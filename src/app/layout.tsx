import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { RouteFade } from "@/components/RouteFade";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chester Andaya — Machine Learning Engineer",
  description:
    "ML engineer and CS undergraduate (GPA 3.64). ICMCR 2026 author. Computer vision systems shipped end-to-end with PyTorch, React, and Django.",
  openGraph: {
    title: "Chester Andaya — Machine Learning Engineer",
    description:
      "Computer vision and full-stack work with measurable outcomes. ICMCR 2026 (Tokyo). NPK detection · Enrollment prediction · Barako Sense · CHED CRIS.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${calistoga.variable}`}>
      <head>
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
        <Cursor />
        <ScrollProgress />
        <RouteFade>{children}</RouteFade>
        <ChatWidget />
      </body>
    </html>
  );
}
