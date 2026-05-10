"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { Material, Option, Question } from "@/types";

import { QuizRunner } from "./quiz-runner";

type QuestionWithOptions = Question & { options: Option[] };

type AccessState = "loading" | "allowed" | "denied";

type Props = {
  material: Material;
  questions: QuestionWithOptions[];
};

export function QuizGuard({ material, questions }: Props) {
  // Pre-migration rows have a null access_level — treat as "public".
  const access = material.access_level ?? "public";
  const isOwnerGated = access === "private";

  const [state, setState] = useState<AccessState>(() =>
    isOwnerGated ? "loading" : "allowed"
  );

  useEffect(() => {
    if (!isOwnerGated) return;
    let cancelled = false;
    supabaseBrowser.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      const userId = data?.user?.id;
      setState(userId && userId === material.user_id ? "allowed" : "denied");
    });
    return () => {
      cancelled = true;
    };
  }, [isOwnerGated, material.user_id]);

  if (state === "loading") {
    return (
      <Shell>
        <p className="text-sm text-foreground/60">Checking access…</p>
      </Shell>
    );
  }

  if (state === "denied") {
    return (
      <Shell>
        <div className="text-center max-w-md mx-auto">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
            Private quiz
          </p>
          <h1 className="mt-3 text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
            This quiz isn&apos;t available
          </h1>
          <p className="mt-3 text-sm text-foreground/60">
            The creator has set this quiz to private. Only they can take it.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-1 px-6 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </Shell>
    );
  }

  return <QuizRunner material={material} questions={questions} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
        <Link
          href="/dashboard"
          className="text-[20px] font-bold leading-[1.4] text-foreground hover:opacity-80 transition-opacity"
        >
          TestCenter
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        {children}
      </main>
    </div>
  );
}
