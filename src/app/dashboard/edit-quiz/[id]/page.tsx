import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";
import type { Material, Option, Question } from "@/types";

import { EditQuizForm } from "./edit-quiz-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("materials")
    .select("title")
    .eq("id", id)
    .maybeSingle();
  return { title: data?.title ? `Edit · ${data.title}` : "Edit quiz" };
}

type QuestionWithOptions = Question & { options: Option[] };

export default async function EditQuizPage({ params }: PageProps) {
  const { id } = await params;

  const { data: material } = await supabase
    .from("materials")
    .select("*")
    .eq("id", id)
    .maybeSingle<Material>();

  if (!material || material.type !== "quiz") {
    notFound();
  }

  const { data: questions } = await supabase
    .from("questions")
    .select(
      "id, material_id, question_text, type, options(id, question_id, option_text, is_correct)"
    )
    .eq("material_id", id)
    .returns<QuestionWithOptions[]>();

  return (
    <EditQuizForm material={material} existingQuestions={questions ?? []} />
  );
}
