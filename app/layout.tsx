import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: {
    default: "TEXSHIMA — Modern Clothing",
    template: "%s | TEXSHIMA",
  },
  description:
    "Modern everyday clothing, designed for the way you move.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} min-h-screen antialiased`}
      >
        <Providers>
          <Navbar />

          <main>
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}