"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { EditorTopBar } from "@/components/quiz-editor/editor-top-bar";
import { Icon } from "@/components/quiz-editor/icon";
import { QuestionCard } from "@/components/quiz-editor/question-card";
import { QuizSetupForm } from "@/components/quiz-editor/quiz-setup-form";
import { SettingsSidebar } from "@/components/quiz-editor/settings-sidebar";
import {
  createDraftOption,
  createDraftQuestion,
  type DraftQuestion,
  type QuizSettings,
  type QuizSetupData,
} from "@/components/quiz-editor/types";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";

const INITIAL_SETUP: QuizSetupData = {
  title: "",
  description: "",
  category: "",
};

const INITIAL_SETTINGS: QuizSettings = {
  time_limit_minutes: null,
  passing_score: null,
  instant_feedback: false,
  mastery_mode: false,
  access_level: "public",
};

type EditorStep = "setup" | "edit";

export default function CreateQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<EditorStep>("setup");
  const [setupData, setSetupData] = useState<QuizSetupData>(INITIAL_SETUP);
  const [settings, setSettings] = useState<QuizSettings>(INITIAL_SETTINGS);
  const [questions, setQuestions] = useState<DraftQuestion[]>(() => [
    createDraftQuestion(),
  ]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSetupComplete = useCallback((data: QuizSetupData) => {
    setSetupData(data);
    setStep("edit");
  }, []);

  const handleTitleChange = useCallback((next: string) => {
    setSetupData((prev) => ({ ...prev, title: next }));
  }, []);

  const handleQuestionChange = useCallback((next: DraftQuestion) => {
    setQuestions((prev) =>
      prev.map((question) => (question.id === next.id ? next : question))
    );
  }, []);

  const handleAddQuestion = useCallback(() => {
    setQuestions((prev) => [...prev, createDraftQuestion()]);
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  const handleDuplicateQuestion = useCallback((sourceId: string) => {
    setQuestions((prev) => {
      const index = prev.findIndex((question) => question.id === sourceId);
      if (index === -1) return prev;
      const source = prev[index];
      const copy: DraftQuestion = {
        id: crypto.randomUUID(),
        question_text: source.question_text,
        type: source.type,
        options: source.options.map((option) => ({
          ...createDraftOption(),
          option_text: option.option_text,
          is_correct: option.is_correct,
        })),
      };
      return [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)];
    });
  }, []);

  const handleDeleteQuestion = useCallback((id: string) => {
    setQuestions((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((question) => question.id !== id);
    });
  }, []);

  const handlePublish = useCallback(async () => {
    setErrorMessage(null);

    const validationError = validateDraft(setupData, settings, questions);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsPublishing(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setErrorMessage("You must be signed in to publish a quiz.");
      setIsPublishing(false);
      return;
    }

    const { data: material, error: materialError } = await supabase
      .from("materials")
      .insert({
        title: setupData.title.trim(),
        description: setupData.description.trim() || null,
        category: setupData.category.trim() || null,
        type: "quiz",
        user_id: userData.user.id,
        file_url: null,
        time_limit_minutes: settings.time_limit_minutes,
        passing_score: settings.passing_score,
        instant_feedback: settings.instant_feedback,
        mastery_mode: settings.mastery_mode,
        access_level: settings.access_level,
      })
      .select("id")
      .single();

    if (materialError || !material) {
      setErrorMessage(
        materialError?.message ?? "Could not create the quiz material."
      );
      setIsPublishing(false);
      return;
    }

    const questionsPayload = questions.map((question) => ({
      material_id: material.id,
      question_text: question.question_text.trim(),
      type: question.type,
      image_url: question.image_url ?? null,
    }));

    const { data: insertedQuestions, error: questionsError } = await supabase
      .from("questions")
      .insert(questionsPayload)
      .select("id");

    if (questionsError || !insertedQuestions) {
      setErrorMessage(
        questionsError?.message ?? "Could not save the quiz questions."
      );
      setIsPublishing(false);
      return;
    }

    const optionsPayload = questions.flatMap((question, index) => {
      if (question.type === "open_ended") return [];
      const insertedQuestion = insertedQuestions[index];
      if (!insertedQuestion) return [];
      return question.options
        .filter((option) => option.option_text.trim().length > 0)
        .map((option) => ({
          question_id: insertedQuestion.id,
          option_text: option.option_text.trim(),
          is_correct: option.is_correct,
        }));
    });

    if (optionsPayload.length > 0) {
      const { error: optionsError } = await supabase
        .from("options")
        .insert(optionsPayload);

      if (optionsError) {
        setErrorMessage(optionsError.message);
        setIsPublishing(false);
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }, [setupData, settings, questions, router]);

  if (step === "setup") {
    return (
      <QuizSetupForm
        initialData={setupData}
        onComplete={handleSetupComplete}
      />
    );
  }

  const questionCount = questions.length;

  return (
    <div className="bg-background min-h-screen">
      <EditorTopBar
        title={setupData.title}
        onTitleChange={handleTitleChange}
        onPublish={handlePublish}
        isPublishing={isPublishing}
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
            <p>Draft</p>
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
        onSave={handlePublish}
        isSaving={isPublishing}
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
  if (!setup.title.trim()) {
    return "Add a title for your quiz before publishing.";
  }
  if (!setup.category.trim()) {
    return "Pick a category for your quiz.";
  }
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
  if (questions.length === 0) {
    return "Add at least one question.";
  }

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    const label = `Question ${index + 1}`;

    if (!question.question_text.trim()) {
      return `${label} is missing its prompt.`;
    }

    if (question.type === "open_ended") continue;

    const filledOptions = question.options.filter(
      (option) => option.option_text.trim().length > 0
    );
    if (filledOptions.length < 2) {
      return `${label} needs at least two filled options.`;
    }

    const correctCount = filledOptions.filter(
      (option) => option.is_correct
    ).length;
    if (correctCount === 0) {
      return `${label} must have at least one correct option marked.`;
    }
    if (question.type !== "multiple" && correctCount > 1) {
      return `${label} can only have one correct option for single-choice questions.`;
    }
  }

  return null;
}
