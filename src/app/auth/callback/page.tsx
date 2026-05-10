"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { supabaseBrowser as supabase } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function goToDashboard() {
      if (cancelled) return;
      router.replace("/dashboard");
      router.refresh();
    }

    function failWith(message: string) {
      if (cancelled) return;
      setErrorMessage(message);
    }

    // Importing the supabase client triggers `detectSessionInUrl`, which
    // automatically exchanges a `?code=` (PKCE) or parses a `#access_token=`
    // (implicit) on init. We listen for the resulting SIGNED_IN event below
    // and also do an initial getSession() in case it landed before this
    // effect ran.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) goToDashboard();
    });

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        failWith(error.message);
        return;
      }
      if (data.session) goToDashboard();
    });

    // Safety net: if 8s passes with no session, surface an error so the
    // user isn't stuck on a "Signing you in…" screen forever.
    const timeout = window.setTimeout(() => {
      failWith("Sign in didn't complete. Please try again.");
    }, 8000);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        {errorMessage ? (
          <>
            <h1 className="text-base font-medium text-foreground">
              Couldn&apos;t sign you in
            </h1>
            <p className="mt-2 text-sm text-foreground/60">{errorMessage}</p>
            <a
              href="/login"
              className="mt-6 inline-block rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface transition-colors"
            >
              Back to sign in
            </a>
          </>
        ) : (
          <p className="text-sm text-foreground/60">Signing you in…</p>
        )}
      </div>
    </main>
  );
}
