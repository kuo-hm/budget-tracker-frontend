import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./assets/css/globals.css";
import Sidebar from "../components/layout/sidebar";
import { AuthCheck } from "@/components/auth/auth-check";
import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Track your expenses and manage your budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        <QueryProvider>
          <AuthCheck />
          <Sidebar>{children}</Sidebar>
        </QueryProvider>
      </body>
    </html>
  );
}
