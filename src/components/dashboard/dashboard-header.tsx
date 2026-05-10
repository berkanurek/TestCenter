"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/quiz-editor/icon";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Browse" },
  { href: "/dashboard/my-stuff", label: "My stuff" },
] as const;

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center gap-8">
        <Link
          href="/dashboard"
          className="text-[20px] font-bold leading-[1.4] text-foreground hover:opacity-80 transition-opacity"
        >
          TestCenter
        </Link>
        <nav className="flex items-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/upload-document"
          className="border border-border text-foreground px-4 py-2 rounded text-sm font-medium hover:bg-surface transition-colors flex items-center gap-1"
        >
          <Icon name="upload_file" size={18} />
          Share document
        </Link>
        <Link
          href="/dashboard/create-quiz"
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
        >
          <Icon name="add" size={18} />
          New quiz
        </Link>
      </div>
    </header>
  );
}
