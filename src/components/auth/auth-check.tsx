"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token && !pathname.startsWith("/auth")) {
      router.push("/auth/login");
    }
  }, [router, pathname]);

  return null;
}
