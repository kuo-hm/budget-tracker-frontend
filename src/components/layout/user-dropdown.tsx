"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  isCollapsed: boolean;
}

export function UserDropdown({ isCollapsed }: UserDropdownProps) {
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
        title={isCollapsed ? `${user?.firstName} ${user?.lastName}` : ""}
      >
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-100">
          {user?.firstName?.charAt(0).toUpperCase()}
        </div>
        {!isCollapsed && (
          <>
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
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isCollapsed ? "left-0" : "bottom-full left-0 mb-2"
          } w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50
          md:absolute md:bottom-full md:left-0 md:mb-2
          sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:mb-0 sm:rounded-none sm:border-t sm:border-x-0`}
        >
          <div className="p-2 border-b border-zinc-800">
            <div className="text-sm font-medium text-zinc-100">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-xs text-zinc-400">{user?.email}</div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 p-1">
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center gap-1 p-2 text-sm text-zinc-100 hover:bg-zinc-800 transition-colors rounded-lg"
            >
              <User size={20} />
              <span className="text-xs">Profile</span>
            </button>
            <button
              onClick={handleSettingsClick}
              className="flex flex-col items-center gap-1 p-2 text-sm text-zinc-100 hover:bg-zinc-800 transition-colors rounded-lg"
            >
              <Settings size={20} />
              <span className="text-xs">Settings</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-1 p-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors rounded-lg"
            >
              <LogOut size={20} />
              <span className="text-xs">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
