"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { EditorTopBar } from "@/components/quiz-editor/editor-top-bar";
import { Icon } from "@/components/quiz-editor/icon";
import { QuestionCard } from "@/components/quiz-editor/question-card";
import { SettingsSidebar } from "@/components/quiz-editor/settings-sidebar";
import {
  createDraftOption,
  createDraftQuestion,
  type DraftQuestion,
  type QuizSettings,
  type QuizSetupData,
} from "@/components/quiz-editor/types";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";
import type { Material, Option, Question } from "@/types";

type QuestionWithOptions = Question & { options: Option[] };

type Props = {
  material: Material;
  existingQuestions: QuestionWithOptions[];
};

function toSetupData(material: Material): QuizSetupData {
  return {
    title: material.title,
    description: material.description ?? "",
    category: material.category ?? "",
  };
}

function toSettings(material: Material): QuizSettings {
  return {
    time_limit_minutes: material.time_limit_minutes,
    passing_score: material.passing_score,
  };
}

function toDraftQuestions(existing: QuestionWithOptions[]): DraftQuestion[] {
  if (existing.length === 0) return [createDraftQuestion()];
  return existing.map((q) => ({
    id: q.id,
    question_text: q.question_text,
    type: q.type,
    options:
      q.type === "multiple_choice" && q.options.length > 0
        ? q.options.map((o) => ({
            id: o.id,
            option_text: o.option_text,
            is_correct: o.is_correct,
          }))
        : [createDraftOption(), createDraftOption()],
  }));
}

export function EditQuizForm({ material, existingQuestions }: Props) {
  const router = useRouter();

  const [setupData, setSetupData] = useState<QuizSetupData>(() =>
    toSetupData(material)
  );
  const [settings, setSettings] = useState<QuizSettings>(() =>
    toSettings(material)
  );
  const [questions, setQuestions] = useState<DraftQuestion[]>(() =>
    toDraftQuestions(existingQuestions)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTitleChange = useCallback((next: string) => {
    setSetupData((prev) => ({ ...prev, title: next }));
  }, []);

  const handleQuestionChange = useCallback((next: DraftQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === next.id ? next : q))
    );
  }, []);

  const handleAddQuestion = useCallback(() => {
    setQuestions((prev) => [...prev, createDraftQuestion()]);
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const handleDuplicateQuestion = useCallback((sourceId: string) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === sourceId);
      if (index === -1) return prev;
      const src = prev[index];
      const copy: DraftQuestion = {
        id: crypto.randomUUID(),
        question_text: src.question_text,
        type: src.type,
        options: src.options.map((o) => ({
          ...createDraftOption(),
          option_text: o.option_text,
          is_correct: o.is_correct,
        })),
      };
      return [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)];
    });
  }, []);

  const handleDeleteQuestion = useCallback((id: string) => {
    setQuestions((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((q) => q.id !== id);
    });
  }, []);

  const handleSave = useCallback(async () => {
    setErrorMessage(null);

    const validationError = validateDraft(setupData, settings, questions);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSaving(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setErrorMessage("You must be signed in to save changes.");
      setIsSaving(false);
      return;
    }

    // Step 1 — update the material row
    const { error: materialError } = await supabase
      .from("materials")
      .update({
        title: setupData.title.trim(),
        description: setupData.description.trim() || null,
        category: setupData.category.trim() || null,
        time_limit_minutes: settings.time_limit_minutes,
        passing_score: settings.passing_score,
      })
      .eq("id", material.id)
      .eq("user_id", userData.user.id); // ownership guard

    if (materialError) {
      setErrorMessage(materialError.message);
      setIsSaving(false);
      return;
    }

    // Step 2 — delete all existing questions (cascades to options via FK)
    const { error: deleteError } = await supabase
      .from("questions")
      .delete()
      .eq("material_id", material.id);

    if (deleteError) {
      setErrorMessage(deleteError.message);
      setIsSaving(false);
      return;
    }

    // Step 3 — re-insert questions
    const questionsPayload = questions.map((q) => ({
      material_id: material.id,
      question_text: q.question_text.trim(),
      type: q.type,
    }));

    const { data: insertedQuestions, error: questionsError } = await supabase
      .from("questions")
      .insert(questionsPayload)
      .select("id");

    if (questionsError || !insertedQuestions) {
      setErrorMessage(questionsError?.message ?? "Could not save questions.");
      setIsSaving(false);
      return;
    }

    // Step 4 — insert options for MC questions
    const optionsPayload = questions.flatMap((q, idx) => {
      if (q.type !== "multiple_choice") return [];
      const inserted = insertedQuestions[idx];
      if (!inserted) return [];
      return q.options
        .filter((o) => o.option_text.trim().length > 0)
        .map((o) => ({
          question_id: inserted.id,
          option_text: o.option_text.trim(),
          is_correct: o.is_correct,
        }));
    });

    if (optionsPayload.length > 0) {
      const { error: optionsError } = await supabase
        .from("options")
        .insert(optionsPayload);

      if (optionsError) {
        setErrorMessage(optionsError.message);
        setIsSaving(false);
        return;
      }
    }

    router.push("/dashboard/my-stuff");
    router.refresh();
  }, [setupData, settings, questions, material.id, router]);

  const questionCount = questions.length;

  return (
    <div className="bg-background min-h-screen">
      <EditorTopBar
        title={setupData.title}
        onTitleChange={handleTitleChange}
        onPublish={handleSave}
        isPublishing={isSaving}
        mode="edit"
        backHref="/dashboard/my-stuff"
      />

      <main className="pt-16 pb-16 pr-80 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-[900px] px-6 mt-16">
          {errorMessage ? (
            <div
              role="alert"
              className="mb-6 p-4 bg-surface border border-border rounded text-sm text-foreground"
            >
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-10">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                onChange={handleQuestionChange}
                onDuplicate={() => handleDuplicateQuestion(question.id)}
                onDelete={() => handleDeleteQuestion(question.id)}
              />
            ))}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="group w-full py-16 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4 hover:border-foreground hover:bg-surface transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors">
                <Icon
                  name="add"
                  className="text-foreground/60 group-hover:text-background transition-colors"
                />
              </div>
              <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground">
                Add Question
              </span>
            </button>
          </div>

          <div className="mt-16 pt-10 border-t border-border flex justify-between text-foreground/60 text-xs">
            <p>Editing</p>
            <p>
              {questionCount} {questionCount === 1 ? "Question" : "Questions"}
            </p>
          </div>
        </div>
      </main>

      <SettingsSidebar
        setupData={setupData}
        onSetupChange={setSetupData}
        settings={settings}
        onSettingsChange={setSettings}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <button
        type="button"
        onClick={handleAddQuestion}
        aria-label="Add question"
        className="fixed bottom-6 right-[340px] w-14 h-14 bg-foreground text-background rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Icon name="magic_button" filled />
      </button>
    </div>
  );
}

function validateDraft(
  setup: QuizSetupData,
  settings: QuizSettings,
  questions: DraftQuestion[]
): string | null {
  if (!setup.title.trim()) return "Add a title before saving.";
  if (!setup.category.trim()) return "Pick a category.";
  if (
    settings.time_limit_minutes !== null &&
    settings.time_limit_minutes <= 0
  ) {
    return "Time limit must be greater than zero.";
  }
  if (
    settings.passing_score !== null &&
    (settings.passing_score < 0 || settings.passing_score > 100)
  ) {
    return "Passing score must be between 0 and 100.";
  }
  if (questions.length === 0) return "Add at least one question.";

  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const label = `Question ${i + 1}`;
    if (!q.question_text.trim()) return `${label} is missing its prompt.`;
    if (q.type !== "multiple_choice") continue;
    const filled = q.options.filter((o) => o.option_text.trim().length > 0);
    if (filled.length < 2) return `${label} needs at least two filled options.`;
    const correct = filled.filter((o) => o.is_correct).length;
    if (correct === 0) return `${label} must have a correct option marked.`;
    if (correct > 1) return `${label} can only have one correct option.`;
  }

  return null;
}
