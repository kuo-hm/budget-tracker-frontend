"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, PieChart } from "lucide-react";
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

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-bold text-zinc-100">Budget Tracker</h1>
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
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <UserDropdown />
        </div>
      </div>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
