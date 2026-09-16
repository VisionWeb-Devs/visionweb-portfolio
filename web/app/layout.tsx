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
    <html lang="en" className={inter.className}>
      <body className="overflow-x-hidden">
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
