"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";

const NOTIFICATIONS_KEY = "tc-email-notifications";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; email: string };

export function Settings() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data?.user) {
        router.replace("/login");
        return;
      }
      setState({ status: "ready", email: data.user.email ?? "" });
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-6 py-14 mx-auto w-full max-w-4xl">
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-[28px] font-bold leading-[1.3] tracking-tight text-foreground">
            Settings
          </h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            Your control center for appearance, preferences, and account
            security.
          </p>
        </header>

        {state.status === "loading" ? (
          <p className="text-sm text-foreground/60">Loading…</p>
        ) : (
          <div className="space-y-8">
            <AppearanceCard />
            <PreferencesCard />
            <SecurityCard email={state.email} />
          </div>
        )}
      </main>
    </div>
  );
}

// ── Appearance ───────────────────────────────────────────────────────────────

function AppearanceCard() {
  return (
    <SectionCard
      title="Appearance"
      description="Switch between light and dark mode. Your preference is stored on this device."
    >
      <ThemeToggle />
    </SectionCard>
  );
}

// ── Preferences ──────────────────────────────────────────────────────────────

function PreferencesCard() {
  // Persists locally for now. Backed by localStorage so the toggle survives
  // refreshes; ready to wire up to a server-side preferences table later.
  const [emailEnabled, setEmailEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_KEY);
      if (stored === "1") setEmailEnabled(true);
    } catch {}
  }, []);

  function toggle(next: boolean) {
    setEmailEnabled(next);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, next ? "1" : "0");
    } catch {}
  }

  return (
    <section className="bg-background border border-border rounded-lg p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-[17px] font-semibold text-foreground">
          Preferences
        </h2>
        <p className="mt-1 text-sm text-foreground/60">
          Control how TestCenter keeps in touch with you.
        </p>
      </div>

      <div className="pt-4 border-t border-border">
        <ToggleRow
          id="email-notifications"
          label="Email notifications"
          description="Receive product updates, weekly digests, and replies to your quizzes."
          checked={emailEnabled}
          onChange={toggle}
        />
      </div>
    </section>
  );
}

// ── Security ─────────────────────────────────────────────────────────────────

function SecurityCard({ email }: { email: string }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  async function handleResetPassword() {
    if (!email || sending) return;
    setSending(true);
    setMessage(null);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setSending(false);
    if (error) {
      setMessage({ kind: "err", text: error.message });
      return;
    }
    setMessage({
      kind: "ok",
      text: `We sent a reset link to ${email}. Check your inbox.`,
    });
  }

  return (
    <SectionCard
      title="Security"
      description="Update your password using a secure email link."
      action={
        <button
          type="button"
          onClick={handleResetPassword}
          disabled={sending}
          className="shrink-0 px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors disabled:opacity-50"
        >
          {sending ? "Sending…" : "Change password"}
        </button>
      }
      footer={
        message ? (
          <p
            role="status"
            className={`text-xs ${
              message.kind === "ok" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        ) : null
      }
    />
  );
}

// ── Reusable section card with title/description/action ──────────────────────

type SectionCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
};

function SectionCard({
  title,
  description,
  children,
  action,
  footer,
}: SectionCardProps) {
  return (
    <section className="bg-background border border-border rounded-lg p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-foreground/60">{description}</p>
        </div>
        {action ?? children}
      </div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </section>
  );
}

// ── ToggleRow ────────────────────────────────────────────────────────────────

type ToggleRowProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-start gap-4">
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 shrink-0 w-9 h-5 rounded-full border transition-colors ${
          checked
            ? "bg-foreground border-foreground"
            : "bg-transparent border-foreground/30 hover:border-foreground/60"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all ${
            checked ? "bg-background translate-x-4" : "bg-foreground/30"
          }`}
        />
      </button>
      <div className="flex-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground cursor-pointer"
        >
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-foreground/60 leading-[1.5]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
