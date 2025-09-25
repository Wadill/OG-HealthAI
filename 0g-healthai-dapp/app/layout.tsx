import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Import the GeistSans configuration
import "./globals.css";

// Initialize GeistSans with options
const geistSans = GeistSans({
  variable: "--font-geist-sans", // CSS variable name
  subsets: ["latin"], // Load only Latin subset for optimization
  // Weight range is automatically included (100–900)
});

export const metadata: Metadata = {
  title: "0G-HealthAI - Decentralized Healthcare",
  description: "AI-powered healthcare management on a decentralized platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}> {/* Attach the variable to className */}
      <body>{children}</body>
    </html>
  );
}