"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/quiz-editor/icon";

type Theme = "light" | "dark";

const STORAGE_KEY = "tc-theme";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  // Avoid hydration mismatch: render a neutral button until mounted, then sync
  // with whatever the inline ThemeScript already applied to <html>.
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-surface flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {mounted ? (
        <Icon name={isDark ? "light_mode" : "dark_mode"} size={20} />
      ) : (
        <span aria-hidden className="block w-5 h-5" />
      )}
    </button>
  );
}
