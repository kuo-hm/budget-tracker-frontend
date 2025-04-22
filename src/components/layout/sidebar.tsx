"use client";

import { HorizontalLogo } from "@/assets/icons/svg";
import LogoutIcon from "@/assets/icons/svg/logout-icon";
import SettingsIcons from "@/assets/icons/svg/settings-icon";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
  items: { href: string; label: string; icon: React.ReactNode }[];
}

const Sidebar = ({ children, items }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);
  const currentPath = usePathname();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return children;
  }
  return (
    <div className="flex h-screen w-full flex-row">
      <aside
        className={`flex h-full flex-col bg-[#EFF4FF] shadow-sm ${
          expanded ? "w-[13vw] px-8" : "w-[5vw] px-4"
        } fixed gap-8 border-0 py-4 `}
      >
        <button
          className="absolute -right-3 top-7 rounded-full border bg-white"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <IoIosArrowBack className="h-5 w-5 text-gray-600" />
          ) : (
            <IoIosArrowForward className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <div className="sidebar-header relative flex w-full items-start justify-start">
          <Link href={"/"} className={`${expanded ? "" : "w-full"}`}>
            <HorizontalLogo withText={expanded} />
          </Link>
        </div>

        <div
          className={`flex h-full flex-col justify-between text-center ${
            expanded ? "items-start" : "items-center"
          }`}
        >
          <div className="text-lg text-gray-600">
            {items?.map((item, index) => (
              <div
                className="sidebar-menu-item w-full cursor-pointer transition-all duration-300 delay-1000 hover:text-primary-500"
                key={index + item.label}
              >
                <Link
                  href={item.href}
                  className={`mb-5 flex items-center gap-6 ${
                    currentPath === item.href ? "text-primary-500" : ""
                  }`}
                >
                  {item.icon}
                  {expanded && item.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-lg text-gray-600">
            <div className="sidebar-menu-item cursor-pointer transition-all duration-300 hover:text-primary-500">
              <Link
                href={"/settings"}
                className={`mb-5 flex items-center gap-6 ${
                  currentPath === "/settings" ? "text-primary-500" : ""
                }`}
              >
                <SettingsIcons />
                {expanded && "Settings"}
              </Link>
            </div>
            <div className="sidebar-menu-item cursor-pointer transition-all duration-300 hover:text-red-500">
              <Link
                href={"/logout"}
                className={`mb-5 flex items-center gap-6 ${
                  currentPath === "/logout" ? "text-primary-500" : ""
                }`}
              >
                <LogoutIcon />
                {expanded && "Logout"}
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`${
          expanded ? "ml-[13vw]" : "ml-[5vw]"
        } w-full transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
