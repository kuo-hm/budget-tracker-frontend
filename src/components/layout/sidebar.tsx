"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UserDropdown } from "./user-dropdown";

interface SidebarProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Categories", href: "/categories", icon: PieChart },
];

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (pathname.startsWith("/auth")) {
    return children;
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } border-r border-zinc-800 flex flex-col transition-all duration-300 relative`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-zinc-800 p-1 rounded-full hover:bg-zinc-700 transition-colors"
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

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
