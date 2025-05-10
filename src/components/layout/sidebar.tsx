"use client";

import { HorizontalLogo } from "@/assets/icons/svg/horizontal-logo";
import { 
  HomeIcon,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/api/auth";

interface SidebarProps {
  children: React.ReactNode;
}

const navigationItems = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/transactions", label: "Transactions", icon: Wallet },
  { href: "/categories", label: "Categories", icon: Tag },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100 lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              width: isExpanded ? "280px" : "80px"
            }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 left-0 z-40 bg-zinc-900 border-r border-zinc-800 lg:relative lg:translate-x-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
                <div className="flex-1 overflow-hidden">
                  <motion.div
                    animate={{ 
                      width: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      display: isExpanded ? "block" : "none"
                    }}
                    transition={{ 
                      type: "spring",
                      damping: 25,
                      stiffness: 200,
                      duration: 0.3
                    }}
                    className="whitespace-nowrap"
                  >
                    <Link href="/" className="flex items-center">
                      <HorizontalLogo withText={true} />
                    </Link>
                  </motion.div>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden lg:flex p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-zinc-800 text-zinc-100"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <motion.div
                        animate={{ 
                          width: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                          marginLeft: isExpanded ? 12 : 0,
                          display: isExpanded ? "block" : "none"
                        }}
                        transition={{ 
                          type: "spring",
                          damping: 25,
                          stiffness: 200,
                          duration: 0.3
                        }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                          transition={{ 
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                            duration: 0.3
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-zinc-800">
                <button
                  onClick={async () => {
                    try {
                      await authService.logout();
                    } catch (error) {
                      console.error("Logout failed:", error);
                      // Still redirect to login page even if the API call fails
                      window.location.href = "/auth/login";
                    }
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <motion.div
                    animate={{ 
                      width: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginLeft: isExpanded ? 12 : 0,
                      display: isExpanded ? "block" : "none"
                    }}
                    transition={{ 
                      type: "spring",
                      damping: 25,
                      stiffness: 200,
                      duration: 0.3
                    }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Logout
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
