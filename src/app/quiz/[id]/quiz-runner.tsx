"use client";

import Link from "next/link";
import { useState } from "react";

import { supabaseBrowser as supabase } from "@/lib/supabase-browser";
import type { Material, Option, Question } from "@/types";

type QuestionWithOptions = Question & { options: Option[] };

type Phase = "taking" | "submitting" | "result";

type AnswerState = {
  selectedOptionId?: string;
  openText?: string;
};

type ResultData = {
  score: number;
  totalGraded: number;
  percentage: number;
  saved: boolean;
};

type QuizRunnerProps = {
  material: Material;
  questions: QuestionWithOptions[];
};

export function QuizRunner({ material, questions }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [phase, setPhase] = useState<Phase>("taking");
  const [result, setResult] = useState<ResultData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100
  );

  function setAnswer(questionId: string, next: AnswerState) {
    setAnswers((prev) => ({ ...prev, [questionId]: next }));
  }

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  async function handleSubmit() {
    setErrorMessage(null);
    setPhase("submitting");

    let score = 0;
    let totalGraded = 0;

    for (const question of questions) {
      if (question.type !== "multiple_choice") continue;
      totalGraded += 1;
      const answer = answers[question.id];
      if (!answer?.selectedOptionId) continue;
      const selected = question.options.find(
        (option) => option.id === answer.selectedOptionId
      );
      if (selected?.is_correct) score += 1;
    }

    const percentage =
      totalGraded > 0 ? Math.round((score / totalGraded) * 100) : 0;

    let saved = false;
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      setErrorMessage(
        "You're not signed in, so this score wasn't saved to your history."
      );
    } else {
      const { error: insertError } = await supabase.from("results").insert({
        user_id: userData.user.id,
        material_id: material.id,
        score,
        total_questions: totalGraded,
      });

      if (insertError) {
        setErrorMessage(`Score not saved: ${insertError.message}`);
      } else {
        saved = true;
      }
    }

    setResult({ score, totalGraded, percentage, saved });
    setPhase("result");
  }

  if (phase === "result" && result) {
    return (
      <ResultView
        material={material}
        result={result}
        errorMessage={errorMessage}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <Shell>
        <p className="text-sm text-foreground/60">No questions to display.</p>
      </Shell>
    );
  }

  const currentAnswer = answers[currentQuestion.id];

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
          {material.title}
        </h1>
        <div className="mt-3 flex items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 shrink-0">
            Question {currentIndex + 1} of {totalQuestions}
          </p>
          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex-1 h-1 bg-border rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-foreground transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <article className="p-10 bg-background border border-border rounded-lg">
        <h2 className="text-[24px] font-semibold leading-[1.4] text-foreground">
          {currentQuestion.question_text}
        </h2>

        <div className="mt-8">
          {currentQuestion.type === "multiple_choice" ? (
            <MultipleChoiceList
              options={currentQuestion.options}
              selectedOptionId={currentAnswer?.selectedOptionId}
              onSelect={(optionId) =>
                setAnswer(currentQuestion.id, { selectedOptionId: optionId })
              }
            />
          ) : (
            <textarea
              rows={6}
              value={currentAnswer?.openText ?? ""}
              onChange={(event) =>
                setAnswer(currentQuestion.id, { openText: event.target.value })
              }
              placeholder="Write your answer here…"
              className="w-full p-4 rounded border border-border bg-background text-[15px] leading-[1.6] text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-foreground/40 focus:border-foreground resize-none"
            />
          )}
        </div>
      </article>

      <div className="mt-8 flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          Previous
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={phase === "submitting"}
            className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {phase === "submitting" ? "Submitting…" : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
          >
            Next
          </button>
        )}
      </div>
    </Shell>
  );
}

type MultipleChoiceListProps = {
  options: Option[];
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
};

function MultipleChoiceList({
  options,
  selectedOptionId,
  onSelect,
}: MultipleChoiceListProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-pressed={isSelected}
            className={`flex items-center gap-4 p-4 border rounded text-left transition-all ${
              isSelected
                ? "border-foreground bg-surface"
                : "border-border hover:border-foreground/40"
            }`}
          >
            <span
              aria-hidden
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? "border-foreground" : "border-foreground/40"
              }`}
            >
              {isSelected ? (
                <span className="w-2 h-2 bg-foreground rounded-full" />
              ) : null}
            </span>
            <span className="text-[17px] leading-[1.6] text-foreground">
              {option.option_text}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type ResultViewProps = {
  material: Material;
  result: ResultData;
  errorMessage: string | null;
};

function ResultView({ material, result, errorMessage }: ResultViewProps) {
  const { score, totalGraded, percentage, saved } = result;
  const passing = material.passing_score;
  const passed = passing !== null ? percentage >= passing : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
            Quiz complete
          </p>
          <h1 className="mt-3 text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
            {material.title}
          </h1>

          {totalGraded > 0 ? (
            <>
              <p className="mt-12 text-[80px] font-bold leading-[1] tracking-[-0.02em] text-foreground tabular-nums">
                {percentage}%
              </p>
              <p className="mt-3 text-sm text-foreground/60">
                Got {score} out of {totalGraded} correct
              </p>
              {passed !== null ? (
                <p
                  className={`mt-4 text-sm font-medium ${
                    passed ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {passed
                    ? "Passed"
                    : `Did not pass — needs ${passing}% to pass`}
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-12 text-[20px] leading-[1.4] font-medium text-foreground">
              Submitted.
              <br />
              <span className="text-sm font-normal text-foreground/60">
                Open-ended quizzes aren&apos;t auto-graded yet.
              </span>
            </p>
          )}

          {errorMessage ? (
            <p
              role="alert"
              className="mt-8 text-xs text-foreground/60 max-w-xs mx-auto"
            >
              {errorMessage}
            </p>
          ) : null}

          {saved ? (
            <p className="mt-4 text-xs text-foreground/50">
              Result saved to your history.
            </p>
          ) : null}

          <div className="mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 py-12 mx-auto w-full max-w-[900px]">
        {children}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
      <Link
        href="/dashboard"
        className="text-[20px] font-bold leading-[1.4] text-foreground hover:opacity-80 transition-opacity"
      >
        TestCenter
      </Link>
      <Link
        href="/dashboard"
        className="text-sm text-foreground/60 hover:text-foreground transition-colors"
      >
        Back to dashboard
      </Link>
    </header>
  );
}
