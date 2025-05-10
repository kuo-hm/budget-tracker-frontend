import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export function FormInput({ icon, error, className = "", ...props }: FormInputProps) {
  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500/50 focus:ring-red-500" : ""}
            ${className}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 