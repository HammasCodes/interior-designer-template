import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atelier Nord | Luxury Interior Design Studio — New York",
  description:
    "A New York interior design atelier crafting residences of quiet precision — full-service interiors, bespoke furnishing and art curation across three continents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-noir text-bone font-body">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
