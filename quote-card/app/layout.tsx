import type { Metadata, Viewport } from "next";
import { FONT_VARIABLES } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quote Card Builder — BookSkim",
  description:
    "Turn your favorite book quotes into beautiful shareable cards. A free tool by BookSkim.",
};

export const viewport: Viewport = {
  themeColor: "#131117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={FONT_VARIABLES}>{children}</body>
    </html>
  );
}
