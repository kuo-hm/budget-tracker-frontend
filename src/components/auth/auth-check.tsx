"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return null;
} 