"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { FormInput } from "@/components/auth/FormInput";
import { registerSchema } from "@/lib/validators/auth";
import { authService } from "@/api/auth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    try {
      const validatedData = registerSchema.parse(formData);
      const response = await authService.register(validatedData);

      if (response.error) {
        setApiError(response.error);
        if (response.errors) {
          setErrors(response.errors as typeof errors);
        }
        return;
      }

      toast.success("Successfully registered!", {
        description: "Welcome to the app!",
        duration: 3000,
      });
      router.push("/auth/login"); 
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          firstName: fieldErrors.firstName?.[0] || "",
          lastName: fieldErrors.lastName?.[0] || "",
          email: fieldErrors.email?.[0] || "",
          password: fieldErrors.password?.[0] || "",
          confirmPassword: fieldErrors.confirmPassword?.[0] || "",
        });
        
      } else {
        console.error("Registration failed:", err);
        setApiError("An unexpected error occurred");
        toast.error("An unexpected error occurred", {
          description: "Please try again later",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <h2 className="text-4xl font-bold text-zinc-100 mb-2">Create Account</h2>
            <p className="text-zinc-400">Sign up to get started</p>
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
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  icon={<User className="h-5 w-5 text-zinc-500" />}
                  error={errors.firstName}
                />

                <FormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  icon={<User className="h-5 w-5 text-zinc-500" />}
                  error={errors.lastName}
                />
              </div>

              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={<Mail className="h-5 w-5 text-zinc-500" />}
                error={errors.email}
              />

              <FormInput
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                icon={<Lock className="h-5 w-5 text-zinc-500" />}
                error={errors.password}
              />

              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                icon={<Lock className="h-5 w-5 text-zinc-500" />}
                error={errors.confirmPassword}
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
                "Sign Up"
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
              Already have an account?{" "}
              <a href="/auth/login" className="text-zinc-100 hover:underline">
                Login
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 