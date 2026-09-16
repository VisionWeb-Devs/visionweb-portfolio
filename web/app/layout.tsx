import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Cursor from "@/components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Visionweb Devs",
  description: "Portfolio site for Visionweb Devs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Next 16 no longer overrides `scroll-behavior: smooth` on navigation
    // unless this attribute is present.
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={inter.className}
    >
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <span id="top" />
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
