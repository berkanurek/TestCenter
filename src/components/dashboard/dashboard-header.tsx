"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/quiz-editor/icon";
import { supabaseBrowser } from "@/lib/supabase-browser";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Browse" },
  { href: "/dashboard/my-stuff", label: "My stuff" },
] as const;

type UserMeta = {
  initial: string;
  displayName: string;
};

function getInitial(name: string | undefined, email: string | undefined): string {
  const src = name?.trim() || email?.trim() || "?";
  return src[0].toUpperCase();
}

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<UserMeta | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      if (!u) return;
      const name = (u.user_metadata?.full_name as string | undefined)?.trim();
      setUser({
        initial: getInitial(name, u.email),
        displayName: name || u.email || "User",
      });
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  async function handleSignOut() {
    setDropdownOpen(false);
    await supabaseBrowser.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
      {/* Left: brand + nav */}
      <div className="flex items-center gap-8">
        <Link
          href="/dashboard"
          className="text-[20px] font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
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

      {/* Right: actions + avatar */}
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

        {/* Separator + avatar */}
        {user ? (
          <>
            <div className="w-px h-5 bg-border mx-1" aria-hidden />
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Open user menu"
                aria-expanded={dropdownOpen}
                className="w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              >
                {user.initial}
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-lg shadow-sm py-1 z-50"
                >
                  {/* User identity row */}
                  <div className="px-4 py-2.5 border-b border-border">
                    <p className="text-xs font-medium text-foreground truncate">
                      {user.displayName}
                    </p>
                  </div>

                  {/* Navigation items */}
                  <Link
                    href="/dashboard/my-stuff"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-surface hover:text-foreground transition-colors"
                  >
                    <Icon name="folder_open" size={16} className="text-foreground/50" />
                    My stuff
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-surface hover:text-foreground transition-colors"
                  >
                    <Icon name="person" size={16} className="text-foreground/50" />
                    My profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-surface hover:text-foreground transition-colors"
                  >
                    <Icon name="settings" size={16} className="text-foreground/50" />
                    Account settings
                  </Link>

                  <div className="my-1 border-t border-border" />

                  <button
                    type="button"
                    onClick={handleSignOut}
                    role="menuitem"
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-surface hover:text-foreground transition-colors text-left"
                  >
                    <Icon name="logout" size={16} className="text-foreground/50" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
