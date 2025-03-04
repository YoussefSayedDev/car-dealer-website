import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Dealer Website",
  description: "A car dealer website with AI tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
