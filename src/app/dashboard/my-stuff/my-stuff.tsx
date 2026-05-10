"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MaterialCard } from "@/components/dashboard/material-card";
import { Icon } from "@/components/quiz-editor/icon";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";
import type { Material, MaterialWithAuthor } from "@/types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; materials: MaterialWithAuthor[] };

export function MyStuff() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

      const { data: materials, error: materialsError } = await supabase
        .from("materials")
        .select("*")
        .eq("user_id", me.id)
        .order("created_at", { ascending: false })
        .returns<Material[]>();

      if (cancelled) return;

      if (materialsError) {
        setState({ status: "error", message: materialsError.message });
        return;
      }

      const myFullName =
        (me.user_metadata?.full_name as string | undefined)?.trim() || null;

      const enriched: MaterialWithAuthor[] = (materials ?? []).map(
        (material) => ({
          ...material,
          author: { id: me.id, full_name: myFullName },
        })
      );

      setState({ status: "ready", materials: enriched });
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function handleEdit(material: MaterialWithAuthor) {
    router.push(`/dashboard/edit-quiz/${material.id}`);
  }

  async function handleDelete(material: MaterialWithAuthor) {
    if (state.status !== "ready") return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${material.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(material.id);

    // For documents we also clean up the underlying Storage object so we
    // don't leave orphan files in the bucket. The materials.questions.options
    // tree is handled by the `on delete cascade` foreign keys for quizzes.
    if (material.type === "document" && material.file_url) {
      const storagePath = extractStoragePath(material.file_url);
      if (storagePath) {
        await supabase.storage.from("documents").remove([storagePath]);
      }
    }

    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", material.id);

    if (error) {
      setDeletingId(null);
      window.alert(`Could not delete: ${error.message}`);
      return;
    }

    setState({
      status: "ready",
      materials: state.materials.filter((m) => m.id !== material.id),
    });
    setDeletingId(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-6 py-14 mx-auto w-full max-w-[1100px]">
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-[28px] font-bold leading-[1.3] tracking-tight text-foreground">
            My stuff
          </h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            Quizzes and documents you&apos;ve published.
          </p>
        </header>

        {state.status === "loading" ? (
          <p className="text-sm text-foreground/60">Loading…</p>
        ) : state.status === "error" ? (
          <ErrorState message={state.message} />
        ) : state.materials.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onDelete={handleDelete}
                isDeleting={deletingId === material.id}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border rounded-lg py-20 px-6 flex flex-col items-center text-center">
      <h2 className="text-[20px] font-semibold leading-[1.3] text-foreground">
        Nothing to manage yet.
      </h2>
      <p className="mt-1 text-sm text-foreground/60 max-w-sm">
        Anything you publish — quizzes or documents — will show up here.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <Link
          href="/dashboard/create-quiz"
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1"
        >
          <Icon name="add" size={18} />
          New quiz
        </Link>
        <Link
          href="/dashboard/upload-document"
          className="border border-border text-foreground px-4 py-2 rounded text-sm font-medium hover:bg-surface transition-colors flex items-center justify-center gap-1"
        >
          <Icon name="upload_file" size={18} />
          Share document
        </Link>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="p-4 bg-surface border border-border rounded text-sm text-foreground"
    >
      Could not load your materials: {message}
    </div>
  );
}

function extractStoragePath(publicUrl: string): string | null {
  // Supabase public URLs look like:
  //   https://<project>.supabase.co/storage/v1/object/public/documents/<path>
  // We strip everything up to and including "/documents/" to get the path
  // we need to pass to .storage.from("documents").remove([...]).
  const marker = "/documents/";
  const idx = publicUrl.indexOf(marker);
  if (idx < 0) return null;
  return publicUrl.substring(idx + marker.length);
}
