"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-100">
          {user?.firstName?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-zinc-100">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-xs text-zinc-400">{user?.email}</div>
        </div>
        <ChevronDown
          size={16}
          className={`text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-zinc-800">
            <div className="text-sm font-medium text-zinc-100">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-xs text-zinc-400">{user?.email}</div>
          </div>
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 w-full p-2 text-sm text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <User size={16} />
            Profile
          </button>
          <button
            onClick={handleSettingsClick}
            className="flex items-center gap-2 w-full p-2 text-sm text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full p-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
