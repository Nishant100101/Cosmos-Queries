import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cosmos Queries",
  description:
    "Cosmos Queries is a next-generation platform built for developers to explore, share, and solve coding challenges across the cosmos of programming knowledge. Whether you're debugging, searching for solutions, or looking to share your expertise, Cosmos-Queries fosters a collaborative environment where developers of all levels can connect and grow.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        
          <ThemeProvider>{children} </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
