import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Icon } from "@/components/quiz-editor/icon";
import { supabase } from "@/lib/supabase";
import type { Material, MaterialWithAuthor } from "@/types";

import { BrowseSection } from "./browse-section";

export const metadata: Metadata = {
  title: "Browse",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { materials, categories, error } = await fetchMaterials();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-6 py-14 mx-auto w-full max-w-[1100px]">
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-[28px] font-bold leading-[1.3] tracking-tight text-foreground">
            Browse
          </h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            Quizzes and documents shared by the TestCenter community.
          </p>
        </header>

        {error ? (
          <ErrorState message={error} />
        ) : materials.length === 0 ? (
          <EmptyState />
        ) : (
          <Suspense fallback={null}>
            <BrowseSection materials={materials} categories={categories} />
          </Suspense>
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border rounded-lg py-20 px-6 flex flex-col items-center text-center">
      <h2 className="text-[20px] font-semibold leading-[1.3] text-foreground">
        Nothing here yet.
      </h2>
      <p className="mt-1 text-sm text-foreground/60 max-w-sm">
        Be the first to share knowledge with the community — create a quiz to
        get started.
      </p>
      <Link
        href="/dashboard/create-quiz"
        className="mt-6 bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
      >
        <Icon name="add" size={18} />
        Create your first quiz
      </Link>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="p-4 bg-surface border border-border rounded text-sm text-foreground"
    >
      Could not load materials: {message}
    </div>
  );
}

async function fetchMaterials(): Promise<{
  materials: MaterialWithAuthor[];
  categories: string[];
  error: string | null;
}> {
  const { data: materials, error: materialsError } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Material[]>();

  if (materialsError) {
    return { materials: [], categories: [], error: materialsError.message };
  }

  if (!materials || materials.length === 0) {
    return { materials: [], categories: [], error: null };
  }

  const userIds = Array.from(new Set(materials.map((m) => m.user_id)));
  const { data: authors } = await supabase
    .from("users")
    .select("id, full_name")
    .in("id", userIds);

  const authorById = new Map<string, { id: string; full_name: string | null }>();
  authors?.forEach((author) => {
    authorById.set(author.id, {
      id: author.id,
      full_name: author.full_name ?? null,
    });
  });

  const enriched: MaterialWithAuthor[] = materials.map((material) => ({
    ...material,
    author: authorById.get(material.user_id) ?? null,
  }));

  const categoriesSet = new Set(
    materials.flatMap((m) => (m.category ? [m.category] : []))
  );
  const categories = Array.from(categoriesSet).sort();

  return { materials: enriched, categories, error: null };
}
