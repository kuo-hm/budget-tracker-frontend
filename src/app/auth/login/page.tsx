"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { authService } from "@/api/auth";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { FormInput } from "@/components/auth/FormInput";
import { loginSchema } from "@/lib/validators/auth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    setErrors({ email: "", password: "" });

    try {
      const validatedData = loginSchema.parse({ email, password });
      const response = await authService.login(validatedData);

      if (response.error) {
        setApiError(response.error);
        if (response.errors) {
          setErrors(response.errors as { email: string; password: string });
        }
        return;
      }

      if (response.data?.token) {
        localStorage.setItem("Authorization", response.data.token);
        // Invalidate and refetch user data
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0] || "",
          password: fieldErrors.password?.[0] || "",
        });
      } else {
        console.error("Login failed:", err);
        setApiError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-8 border border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-zinc-100 mb-2">
              Welcome Back
            </h2>
            <p className="text-zinc-400">Please login to your account</p>
          </motion.div>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <p className="text-red-500 text-sm text-center">{apiError}</p>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <FormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={<Mail className="h-5 w-5 text-zinc-500" />}
                error={errors.email}
              />

              <FormInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={<Lock className="h-5 w-5 text-zinc-500" />}
                error={errors.password}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-zinc-100 text-zinc-900 rounded-lg font-semibold hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full mx-auto"
                />
              ) : (
                "Login"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-zinc-400">
              {"Don't have an account?"}{" "}
              <a
                href="/auth/register"
                className="text-zinc-100 hover:underline"
              >
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
