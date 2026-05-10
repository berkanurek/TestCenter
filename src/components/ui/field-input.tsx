"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

type FieldInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  function FieldInput({ label, id, name, className, ...props }, ref) {
    const inputId =
      id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-foreground/60"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={[
            "w-full rounded border border-transparent bg-transparent",
            "px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40",
            "outline-none transition-colors",
            "hover:border-border focus:border-border",
            className ?? "",
          ].join(" ")}
          {...props}
        />
      </div>
    );
  }
);
