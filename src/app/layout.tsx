import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/css/globals.css";
import Sidebar from "../components/layout/sidebar";
import { 
  HomeIcon as HomeIconOutline,
  BarChart3,
  Wallet,
  Settings,
  LogOut
} from "lucide-react";
import { AuthCheck } from "@/components/auth/auth-check";

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

const items = [
  { href: "/", label: "Dashboard", icon: <HomeIconOutline className="w-6 h-6" /> },
  { href: "/transactions", label: "Transactions", icon: <Wallet className="w-6 h-6" /> },
  { href: "/analytics", label: "Analytics", icon: <BarChart3 className="w-6 h-6" /> },
  { href: "/settings", label: "Settings", icon: <Settings className="w-6 h-6" /> },
  { href: "/logout", label: "Logout", icon: <LogOut className="w-6 h-6" /> },
];

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
        <AuthCheck />
        <Sidebar >
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
