import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";
import type { Material, Option, Question } from "@/types";

import { QuizGuard } from "./quiz-guard";

export const dynamic = "force-dynamic";

type QuestionWithOptions = Question & { options: Option[] };

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: material } = await supabase
    .from("materials")
    .select("title, description, category")
    .eq("id", id)
    .maybeSingle<Pick<Material, "title" | "description" | "category">>();

  if (!material) {
    return { title: "Quiz not found" };
  }

  const title = material.title;
  const description =
    material.description?.trim() ||
    (material.category
      ? `A ${material.category} quiz on TestCenter.`
      : "An interactive quiz on TestCenter.");

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title: `${title} · TestCenter`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} · TestCenter`,
      description,
    },
  };
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params;

  const { data: material } = await supabase
    .from("materials")
    .select("*")
    .eq("id", id)
    .maybeSingle<Material>();

  if (!material || material.type !== "quiz") {
    notFound();
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select(
      "id, material_id, question_text, type, image_url, options(id, question_id, option_text, is_correct)"
    )
    .eq("material_id", id)
    .returns<QuestionWithOptions[]>();

  if (questionsError) {
    return (
      <EmptyShell title={material.title}>
        <p role="alert" className="text-sm text-foreground">
          Could not load this quiz: {questionsError.message}
        </p>
      </EmptyShell>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <EmptyShell title={material.title}>
        <p className="text-sm text-foreground/60">
          This quiz has no questions yet.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-1 px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
        >
          Back to dashboard
        </Link>
      </EmptyShell>
    );
  }

  return <QuizGuard material={material} questions={questions} />;
}

function EmptyShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 px-6 border-b border-border flex items-center bg-background">
        <Link
          href="/dashboard"
          className="text-[20px] font-bold leading-[1.4] text-foreground hover:opacity-80 transition-opacity"
        >
          TestCenter
        </Link>
      </header>
      <main className="flex-1 px-6 py-16 mx-auto w-full max-w-[900px] text-center">
        <h1 className="text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground mb-3">
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}
