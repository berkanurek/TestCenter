"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Icon } from "@/components/quiz-editor/icon";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";

type ProfileData = {
  id: string;
  email: string;
  initial: string;
  fullName: string;
  joinedAt: string;
  stats: {
    quizzesCreated: number;
    testsCompleted: number;
    globalRank: string;
  };
};

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: ProfileData };

function getInitial(name: string, email: string): string {
  const src = name.trim() || email.trim() || "?";
  return src[0].toUpperCase();
}

function formatJoinDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  } catch {
    return "";
  }
}

export function Profile() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: userResult, error: userError } =
        await supabase.auth.getUser();

      if (cancelled) return;

      if (userError || !userResult?.user) {
        router.replace("/login");
        return;
      }

      const me = userResult.user;
      const email = me.email ?? "";
      const fullName =
        (me.user_metadata?.full_name as string | undefined)?.trim() ?? "";

      // Stats — pulled live from Supabase. Global rank stays as a polite
      // placeholder until we have a real leaderboard query in place.
      const [createdRes, completedRes] = await Promise.all([
        supabase
          .from("materials")
          .select("id", { count: "exact", head: true })
          .eq("user_id", me.id),
        supabase
          .from("results")
          .select("id", { count: "exact", head: true })
          .eq("user_id", me.id),
      ]);

      if (cancelled) return;

      setState({
        status: "ready",
        data: {
          id: me.id,
          email,
          initial: getInitial(fullName, email),
          fullName,
          joinedAt: me.created_at,
          stats: {
            quizzesCreated: createdRes.count ?? 0,
            testsCompleted: completedRes.count ?? 0,
            globalRank: "—",
          },
        },
      });
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-6 py-14 mx-auto w-full max-w-4xl">
        <header className="mb-10 pb-8 border-b border-border flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold leading-[1.3] tracking-tight text-foreground">
              My profile
            </h1>
            <p className="mt-1.5 text-sm text-foreground/60">
              Your identity and learning progress on TestCenter.
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="shrink-0 px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors flex items-center gap-1.5"
          >
            <Icon name="settings" size={16} />
            Settings
          </Link>
        </header>

        {state.status === "loading" ? (
          <p className="text-sm text-foreground/60">Loading…</p>
        ) : state.status === "error" ? (
          <ErrorState message={state.message} />
        ) : (
          <ProfileBody data={state.data} onUpdate={(d) => setState({ status: "ready", data: d })} />
        )}
      </main>
    </div>
  );
}

// ── Body ─────────────────────────────────────────────────────────────────────

type ProfileBodyProps = {
  data: ProfileData;
  onUpdate: (next: ProfileData) => void;
};

function ProfileBody({ data, onUpdate }: ProfileBodyProps) {
  return (
    <div className="space-y-8">
      <IdentityCard data={data} onUpdate={onUpdate} />
      <StatsRow stats={data.stats} />
    </div>
  );
}

// ── Identity card (avatar + email + display name) ────────────────────────────

function IdentityCard({ data, onUpdate }: ProfileBodyProps) {
  const [name, setName] = useState(data.fullName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const trimmed = name.trim();
  const isDirty = trimmed !== data.fullName;

  async function handleSave() {
    if (!isDirty || saving) return;
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: trimmed },
    });

    if (error) {
      setSaving(false);
      setMessage({ kind: "err", text: error.message });
      return;
    }

    onUpdate({
      ...data,
      fullName: trimmed,
      initial: getInitial(trimmed, data.email),
    });
    setSaving(false);
    setMessage({ kind: "ok", text: "Saved." });
  }

  return (
    <section className="bg-background border border-border rounded-lg p-6 sm:p-8">
      <div className="flex items-center gap-5">
        <div
          aria-hidden
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-foreground text-background flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0"
        >
          {data.initial}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/50">
            Signed in as
          </p>
          <p
            className="mt-0.5 text-[17px] font-medium text-foreground truncate"
            title={data.email}
          >
            {data.email}
          </p>
          {data.joinedAt ? (
            <p className="mt-1 text-xs text-foreground/50">
              Member since {formatJoinDate(data.joinedAt)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <label
          htmlFor="profile-name"
          className="block text-xs font-medium text-foreground/60"
        >
          Display name
        </label>
        <div className="flex items-center gap-2">
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-foreground/40 focus:border-foreground"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="px-4 py-2 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
        {message ? (
          <p
            role="status"
            className={`text-xs ${
              message.kind === "ok" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        ) : (
          <p className="text-xs text-foreground/50">
            Visible to other users on quizzes you publish.
          </p>
        )}
      </div>
    </section>
  );
}

// ── Stats ────────────────────────────────────────────────────────────────────

function StatsRow({ stats }: { stats: ProfileData["stats"] }) {
  const items = [
    {
      label: "Quizzes created",
      value: stats.quizzesCreated.toLocaleString(),
      icon: "list",
    },
    {
      label: "Tests completed",
      value: stats.testsCompleted.toLocaleString(),
      icon: "check_circle",
    },
    {
      label: "Global rank",
      value: stats.globalRank,
      icon: "trending_up",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-background border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-foreground/50">
            <Icon name={item.icon} size={16} />
            <p className="text-xs font-medium uppercase tracking-wider">
              {item.label}
            </p>
          </div>
          <p className="mt-3 text-[28px] font-bold leading-[1.1] text-foreground tabular-nums">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}

// ── Misc ─────────────────────────────────────────────────────────────────────

function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="p-4 bg-surface border border-border rounded text-sm text-foreground"
    >
      Could not load your profile: {message}
    </div>
  );
}
