import type { Metadata } from "next";
import { Inter, Calistoga } from 'next/font/google';
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { SurudoiCursor } from '@/components/SurudoiCursor';
import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const calistoga = Calistoga({ subsets: ['latin'], variable: '--font-serif', weight: ["400"] });

export const metadata: Metadata = {
  title: "Chester 'Surudoi' Andaya | Machine Learning Portfolio",
  description: "Computer Science student specializing in Machine Learning. Sharp mind. Focused solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge(inter.variable, calistoga.variable, "bg-gray-900 text-white antialiased font-sans")}>

        {/* Loading Screen */}
        <LoadingScreenWrapper />

        {/* Cursor */}
        <SurudoiCursor />

        {/* Main Content */}
        {children}

      </body>
    </html>
  );
}
