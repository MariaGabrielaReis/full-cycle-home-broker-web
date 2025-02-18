import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Broker",
  description: "A Home Broker developed in a Full Stack && Full Cycle event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">{children}</body>
    </html>
  );
}
