"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from 'js-cookie';

export function AuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("Authorization");
    if (!token && !pathname.startsWith("/auth")) {
      router.push("/auth/login");
    }
  }, [router, pathname]);

  return null;
}
