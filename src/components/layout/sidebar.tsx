"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  PieChart,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { UserDropdown } from "./user-dropdown";

interface SidebarProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Categories", href: "/categories", icon: PieChart },
  { name: "Goals", href: "/goals", icon: PieChart },
];

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (pathname.startsWith("/auth")) {
    return children;
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X size={20} className="text-zinc-400" />
        ) : (
          <Menu size={20} className="text-zinc-400" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } border-r border-zinc-800 flex flex-col transition-all duration-300 relative
        ${isMobile ? "fixed inset-y-0 left-0 z-40 transform" : ""}
        ${isMobile && !isMobileMenuOpen ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-zinc-800 p-1 rounded-full hover:bg-zinc-700 transition-colors hidden md:block"
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-zinc-400" />
          ) : (
            <ChevronLeft size={16} className="text-zinc-400" />
          )}
        </button>

        <div className={`p-4 ${isCollapsed ? "text-center" : ""}`}>
          <h1
            className={`text-xl font-bold text-zinc-100 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Budget Tracker
          </h1>
          {isCollapsed && (
            <span className="text-xl font-bold text-zinc-100">BT</span>
          )}
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon size={18} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-4 border-t border-zinc-800 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <UserDropdown isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 min-h-screen w-full md:w-auto">
        {children}
      </main>

      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
