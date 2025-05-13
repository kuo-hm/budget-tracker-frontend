"use client";

import { createContext, useContext, ReactNode, Suspense } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { AuthState } from "@/lib/types/user";

interface AuthContextType extends AuthState {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderContent({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
