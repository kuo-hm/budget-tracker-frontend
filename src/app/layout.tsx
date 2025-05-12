import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./assets/css/globals.css";
import { Providers } from "../providers";
import { AuthProvider } from "@/providers/auth-provider";
import Sidebar from "@/components/layout/sidebar";
import { AuthCheck } from "@/components/auth/auth-check";
import { Toaster } from "sonner";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        <AuthCheck />
        <Providers>
          <AuthProvider>
            <Sidebar>{children}</Sidebar>
          </AuthProvider>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
