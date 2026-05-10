"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";
import type { Material, Option, Question } from "@/types";

type QuestionWithOptions = Question & { options: Option[] };

type Phase = "taking" | "mastery" | "submitting" | "result";

// selectedOptionIds is used for both single (≤1 element) and multiple (≥0 elements)
type AnswerState = {
  selectedOptionIds: string[];
  openText: string;
};

function emptyAnswer(): AnswerState {
  return { selectedOptionIds: [], openText: "" };
}

type ResultData = {
  score: number;
  totalGraded: number;
  percentage: number;
  saved: boolean;
};

// ── Type helpers ──────────────────────────────────────────────────────────────
// Keep the runner backward-compatible with old "multiple_choice" rows and treat
// any unexpected/legacy type with options as a single-choice question.

function isChoiceType(type: string | null | undefined): boolean {
  return type === "single" || type === "multiple" || type === "multiple_choice";
}

function isMultipleType(type: string | null | undefined): boolean {
  return type === "multiple";
}

function safeOptions(question: QuestionWithOptions): Option[] {
  return Array.isArray(question.options) ? question.options : [];
}

// ── Answer correctness helper ─────────────────────────────────────────────────

function isAnswerCorrect(
  question: QuestionWithOptions,
  answer: AnswerState
): boolean {
  try {
    const type = question?.type;
    const options = safeOptions(question);
    const selectedOptionIds = answer?.selectedOptionIds ?? [];

    if (type === "open_ended") return false;
    if (options.length === 0) return false;
    if (selectedOptionIds.length === 0) return false;

    if (isMultipleType(type)) {
      const correctIds = new Set(
        options.filter((o) => o.is_correct).map((o) => o.id)
      );
      if (correctIds.size === 0) return false;
      const selectedSet = new Set(selectedOptionIds);
      if (selectedSet.size !== correctIds.size) return false;
      for (const id of selectedSet) {
        if (!correctIds.has(id)) return false;
      }
      return true;
    }

    // Default: single, multiple_choice, or any unknown choice-like type
    const selected = options.find((o) => o.id === selectedOptionIds[0]);
    return selected?.is_correct ?? false;
  } catch {
    return false;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

type QuizRunnerProps = {
  material: Material;
  questions: QuestionWithOptions[];
};

export function QuizRunner({ material, questions }: QuizRunnerProps) {
  // ── Taking phase ────────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  // ── Mastery phase ───────────────────────────────────────────────────────────
  const [masteryQueue, setMasteryQueue] = useState<QuestionWithOptions[]>([]);
  const [masteryTotal, setMasteryTotal] = useState(0);
  const [masteryAnswer, setMasteryAnswer] = useState<AnswerState>(
    emptyAnswer()
  );
  const [masteryRevealed, setMasteryRevealed] = useState(false);

  // ── Shared ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("taking");
  const [result, setResult] = useState<ResultData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const instantFeedback = material.instant_feedback ?? false;
  const masteryMode = material.mastery_mode ?? false;

  // ── Countdown timer ─────────────────────────────────────────────────────────
  const initialSeconds =
    material.time_limit_minutes && material.time_limit_minutes > 0
      ? material.time_limit_minutes * 60
      : null;
  const [secondsLeft, setSecondsLeft] = useState<number | null>(initialSeconds);
  const isTimerActive = secondsLeft !== null && (phase === "taking" || phase === "mastery");

  // Tick down every second while active
  useEffect(() => {
    if (!isTimerActive) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isTimerActive]);

  // When timer hits zero → auto-submit (works from either taking or mastery)
  useEffect(() => {
    if (secondsLeft !== 0) return;
    if (phase !== "taking" && phase !== "mastery") return;
    void submitQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // ── Taking phase derived values ──────────────────────────────────────────────
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100
  );

  // ── Answer helpers ───────────────────────────────────────────────────────────

  function getAnswer(questionId: string): AnswerState {
    return answers[questionId] ?? emptyAnswer();
  }

  function handleSingleSelect(questionId: string, optionId: string) {
    const next: AnswerState = {
      ...getAnswer(questionId),
      selectedOptionIds: [optionId],
    };
    setAnswers((prev) => ({ ...prev, [questionId]: next }));
    if (instantFeedback) {
      setRevealed((prev) => new Set([...prev, questionId]));
    }
  }

  function handleMultipleToggle(questionId: string, optionId: string) {
    setAnswers((prev) => {
      const current = prev[questionId]?.selectedOptionIds ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: { ...getAnswer(questionId), selectedOptionIds: next } };
    });
  }

  function handleRevealAnswer(questionId: string) {
    setRevealed((prev) => new Set([...prev, questionId]));
  }

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handleNext() {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  }

  // ── Core submission ───────────────────────────────────────────────────────────

  async function submitQuiz() {
    setErrorMessage(null);
    setPhase("submitting");

    let score = 0;
    let totalGraded = 0;

    for (const question of questions) {
      if (!isChoiceType(question.type)) continue;
      if (safeOptions(question).length === 0) continue; // skip broken questions
      totalGraded += 1;
      const answer = answers[question.id] ?? emptyAnswer();
      if (isAnswerCorrect(question, answer)) score += 1;
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

  async function handleSubmit() {
    if (masteryMode) {
      const wrongQuestions = questions.filter((q) => {
        if (!isChoiceType(q.type)) return false;
        if (safeOptions(q).length === 0) return false; // un-answerable, can't be retried
        return !isAnswerCorrect(q, answers[q.id] ?? emptyAnswer());
      });

      if (wrongQuestions.length > 0) {
        setMasteryQueue(wrongQuestions);
        setMasteryTotal(wrongQuestions.length);
        setMasteryAnswer(emptyAnswer());
        setMasteryRevealed(false);
        setPhase("mastery");
        return;
      }
    }

    await submitQuiz();
  }

  // ── Mastery advance ───────────────────────────────────────────────────────────

  async function handleMasteryNext() {
    const currentMasteryQ = masteryQueue[0];
    if (!currentMasteryQ) return;

    const correct = isAnswerCorrect(currentMasteryQ, masteryAnswer);
    const newQueue = correct
      ? masteryQueue.slice(1)
      : [...masteryQueue.slice(1), currentMasteryQ];

    if (newQueue.length === 0) {
      await submitQuiz();
      return;
    }

    setMasteryQueue(newQueue);
    setMasteryAnswer(emptyAnswer());
    setMasteryRevealed(false);
  }

  // ── Mastery: toggle multiple or select single ─────────────────────────────────

  function handleMasterySelect(optionId: string) {
    if (masteryRevealed) return;
    const q = masteryQueue[0];
    if (!q) return;

    if (isMultipleType(q.type)) {
      setMasteryAnswer((prev) => {
        const current = prev.selectedOptionIds;
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, selectedOptionIds: next };
      });
    } else {
      setMasteryAnswer({ selectedOptionIds: [optionId], openText: "" });
      setMasteryRevealed(true);
    }
  }

  // ── Render: result ─────────────────────────────────────────────────────────────

  if (phase === "result" && result) {
    return (
      <ResultView
        material={material}
        result={result}
        errorMessage={errorMessage}
        questions={questions}
        answers={answers}
      />
    );
  }

  // ── Render: mastery round ─────────────────────────────────────────────────────

  if (phase === "mastery") {
    const currentMasteryQ = masteryQueue[0];
    const masteredCount = masteryTotal - masteryQueue.length;
    const masteryProgressPercent = Math.round(
      (masteredCount / masteryTotal) * 100
    );
    const masteryIsCorrect = isAnswerCorrect(currentMasteryQ ?? questions[0], masteryAnswer);
    const isMultipleMastery = isMultipleType(currentMasteryQ?.type);
    const hasSelection = masteryAnswer.selectedOptionIds.length > 0;
    const isFinishingMove =
      masteryQueue.length === 1 && masteryRevealed && masteryIsCorrect;

    return (
      <Shell>
        <TimerBanner secondsLeft={secondsLeft} />
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-foreground text-background">
            ★ Mastery Round
          </span>
          <span className="text-xs text-foreground/50">
            {masteryQueue.length === 1
              ? "1 question remaining"
              : `${masteryQueue.length} questions remaining`}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
            {material.title}
          </h1>
          <div className="mt-3 flex items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 shrink-0">
              {masteredCount} of {masteryTotal} mastered
            </p>
            <div
              role="progressbar"
              aria-label="Mastery progress"
              aria-valuenow={masteryProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="flex-1 h-1 bg-border rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-foreground transition-all duration-500"
                style={{ width: `${masteryProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {currentMasteryQ ? (
          <>
            <article className="p-10 bg-background border border-border rounded-lg">
              <QuestionImage imageUrl={currentMasteryQ.image_url} />
              <h2 className="text-[24px] font-semibold leading-[1.4] text-foreground">
                {currentMasteryQ.question_text}
              </h2>

              <div className="mt-8">
                <ChoiceList
                  options={currentMasteryQ.options}
                  selectedOptionIds={masteryAnswer.selectedOptionIds}
                  isRevealed={masteryRevealed}
                  isMultiple={isMultipleMastery}
                  locked={masteryRevealed}
                  onSingleSelect={(optionId) => handleMasterySelect(optionId)}
                  onMultipleToggle={(optionId) => handleMasterySelect(optionId)}
                />
              </div>

              {isMultipleMastery && !masteryRevealed && hasSelection ? (
                <button
                  type="button"
                  onClick={() => setMasteryRevealed(true)}
                  className="mt-6 px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
                >
                  Check Answer
                </button>
              ) : null}

              {masteryRevealed ? (
                <FeedbackBanner isCorrect={masteryIsCorrect} isMastery />
              ) : null}
            </article>

            <div className="mt-8 flex justify-between items-center gap-4">
              <p className="text-xs text-foreground/50">
                {masteryRevealed && !masteryIsCorrect
                  ? "This question will reappear at the end."
                  : null}
              </p>
              <button
                type="button"
                onClick={handleMasteryNext}
                disabled={!masteryRevealed}
                className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                {isFinishingMove ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : null}
      </Shell>
    );
  }

  // ── Render: taking phase ──────────────────────────────────────────────────────

  if (!currentQuestion) {
    return (
      <Shell>
        <p className="text-sm text-foreground/60">No questions to display.</p>
      </Shell>
    );
  }

  const currentAnswer = getAnswer(currentQuestion.id);
  const isRevealed = revealed.has(currentQuestion.id);
  const isMultiple = isMultipleType(currentQuestion.type);
  const isChoice = isChoiceType(currentQuestion.type);
  const currentOptions = safeOptions(currentQuestion);
  const hasNoOptions = isChoice && currentOptions.length === 0;
  const hasSelection = currentAnswer.selectedOptionIds.length > 0;

  // Next/Submit is gated on revealed state only for instant-feedback mode.
  // Broken (zero-option) questions can always advance via the Skip flow.
  const canAdvance =
    hasNoOptions || !instantFeedback || !isChoice || isRevealed;

  // Show "Check Answer" button for multi-select with instant feedback, before revealed
  const showCheckButton =
    instantFeedback &&
    isMultiple &&
    !hasNoOptions &&
    !isRevealed &&
    hasSelection;

  return (
    <Shell>
      <TimerBanner secondsLeft={secondsLeft} />
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
        <QuestionImage imageUrl={currentQuestion.image_url} />

        <h2 className="text-[24px] font-semibold leading-[1.4] text-foreground">
          {currentQuestion.question_text}
        </h2>

        <div className="mt-8">
          {currentQuestion.type === "open_ended" ? (
            <textarea
              rows={6}
              value={currentAnswer.openText}
              onChange={(event) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: {
                    ...getAnswer(currentQuestion.id),
                    openText: event.target.value,
                  },
                }))
              }
              placeholder="Write your answer here…"
              className="w-full p-4 rounded border border-border bg-background text-[15px] leading-[1.6] text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-foreground/40 focus:border-foreground resize-none"
            />
          ) : hasNoOptions ? (
            <NoOptionsNotice />
          ) : (
            <ChoiceList
              options={currentOptions}
              selectedOptionIds={currentAnswer.selectedOptionIds}
              isRevealed={isRevealed}
              isMultiple={isMultiple}
              locked={instantFeedback && isRevealed}
              onSingleSelect={(optionId) =>
                handleSingleSelect(currentQuestion.id, optionId)
              }
              onMultipleToggle={(optionId) =>
                handleMultipleToggle(currentQuestion.id, optionId)
              }
            />
          )}
        </div>

        {showCheckButton ? (
          <button
            type="button"
            onClick={() => handleRevealAnswer(currentQuestion.id)}
            className="mt-6 px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
          >
            Check Answer
          </button>
        ) : null}

        {instantFeedback && isRevealed ? (
          <FeedbackBanner
            isCorrect={isAnswerCorrect(currentQuestion, currentAnswer)}
          />
        ) : null}
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
            disabled={phase === "submitting" || !canAdvance}
            className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {phase === "submitting"
              ? "Submitting…"
              : hasNoOptions
              ? "Skip & Submit"
              : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {hasNoOptions ? "Skip" : "Next"}
          </button>
        )}
      </div>
    </Shell>
  );
}

// ── TimerBanner ──────────────────────────────────────────────────────────────

function formatSeconds(total: number): string {
  const safe = Math.max(0, total);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function TimerBanner({ secondsLeft }: { secondsLeft: number | null }) {
  if (secondsLeft === null) return null;
  const isWarning = secondsLeft <= 10;
  return (
    <div
      role="timer"
      aria-live={isWarning ? "assertive" : "polite"}
      className={`mb-4 flex items-center justify-between gap-3 px-4 py-2.5 rounded border text-sm font-medium ${
        isWarning
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-border bg-surface text-foreground/80"
      }`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-base leading-none">
          ⏱
        </span>
        <span className="text-xs uppercase tracking-wider">Time remaining</span>
      </div>
      <span
        className={`tabular-nums font-semibold text-base ${
          isWarning ? "text-red-600" : "text-foreground"
        }`}
      >
        {formatSeconds(secondsLeft)}
      </span>
    </div>
  );
}

// ── QuestionImage ────────────────────────────────────────────────────────────

function QuestionImage({ imageUrl }: { imageUrl: string | null }) {
  if (!imageUrl) return null;
  return (
    <div className="mb-6 rounded-lg overflow-hidden border border-border bg-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="w-full max-h-72 object-contain"
        onError={(e) => {
          (e.currentTarget.parentElement as HTMLElement).style.display = "none";
        }}
      />
    </div>
  );
}

// ── ChoiceList ────────────────────────────────────────────────────────────────

type ChoiceListProps = {
  options: Option[];
  selectedOptionIds: string[];
  isRevealed: boolean;
  isMultiple: boolean;
  locked: boolean;
  onSingleSelect: (optionId: string) => void;
  onMultipleToggle: (optionId: string) => void;
};

function ChoiceList({
  options,
  selectedOptionIds,
  isRevealed,
  isMultiple,
  locked,
  onSingleSelect,
  onMultipleToggle,
}: ChoiceListProps) {
  const safeList = Array.isArray(options) ? options : [];
  const selectedSet = new Set(selectedOptionIds);

  if (safeList.length === 0) return <NoOptionsNotice />;

  return (
    <div className="flex flex-col gap-3">
      {safeList.map((option) => {
        const isSelected = selectedSet.has(option.id);

        let borderClass = "border-border hover:border-foreground/40";
        let bgClass = "";
        let indicatorBorderClass = "border-foreground/40";
        let indicatorFillClass = "";

        if (isRevealed) {
          if (option.is_correct) {
            borderClass = "border-emerald-400";
            bgClass = "bg-emerald-50";
            indicatorBorderClass = "border-emerald-500";
            indicatorFillClass = "bg-emerald-500";
          } else if (isSelected) {
            borderClass = "border-red-400";
            bgClass = "bg-red-50";
            indicatorBorderClass = "border-red-400";
            indicatorFillClass = "bg-red-400";
          }
        } else if (isSelected) {
          borderClass = "border-foreground";
          bgClass = "bg-surface";
          indicatorBorderClass = "border-foreground";
          indicatorFillClass = "bg-foreground";
        }

        const showDot = isSelected || (isRevealed && option.is_correct);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              !locked &&
              (isMultiple ? onMultipleToggle(option.id) : onSingleSelect(option.id))
            }
            aria-pressed={isSelected}
            disabled={locked}
            className={`flex items-center gap-4 p-4 border rounded text-left transition-all ${borderClass} ${bgClass} ${
              locked ? "cursor-default" : ""
            }`}
          >
            {/* Radio (circle) for single, checkbox (square) for multiple */}
            <span
              aria-hidden
              className={`shrink-0 flex items-center justify-center transition-colors ${
                isMultiple
                  ? `w-4 h-4 rounded border ${indicatorBorderClass}`
                  : `w-4 h-4 rounded-full border ${indicatorBorderClass}`
              }`}
            >
              {showDot ? (
                <span
                  className={`rounded-sm ${indicatorFillClass} ${
                    isMultiple ? "w-2.5 h-2.5" : "w-2 h-2 rounded-full"
                  }`}
                />
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

// ── NoOptionsNotice ───────────────────────────────────────────────────────────

function NoOptionsNotice() {
  return (
    <div
      role="status"
      className="p-6 bg-surface border border-dashed border-border rounded-lg text-center"
    >
      <p className="text-sm font-medium text-foreground">
        No options found for this question
      </p>
      <p className="mt-1 text-xs text-foreground/60">
        Use the button below to skip and continue.
      </p>
    </div>
  );
}

// ── FeedbackBanner ────────────────────────────────────────────────────────────

type FeedbackBannerProps = {
  isCorrect: boolean;
  isMastery?: boolean;
};

function FeedbackBanner({ isCorrect, isMastery = false }: FeedbackBannerProps) {
  const correctMsg = isMastery
    ? "Correct! One step closer to mastery."
    : "Correct!";
  const wrongMsg = isMastery
    ? "Not quite — this question will come back around."
    : "Incorrect — see the highlighted answer above.";

  return (
    <div
      className={`mt-6 flex items-center gap-2 px-4 py-3 rounded text-sm font-medium ${
        isCorrect
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
    >
      <span aria-hidden>{isCorrect ? "✓" : "✗"}</span>
      <span>{isCorrect ? correctMsg : wrongMsg}</span>
    </div>
  );
}

// ── Results view ──────────────────────────────────────────────────────────────

type ResultViewProps = {
  material: Material;
  result: ResultData;
  errorMessage: string | null;
  questions: QuestionWithOptions[];
  answers: Record<string, AnswerState>;
};

function ResultView({
  material,
  result,
  errorMessage,
  questions,
  answers,
}: ResultViewProps) {
  const [showReview, setShowReview] = useState(false);

  const { score, totalGraded, percentage, saved } = result;
  const passing = material.passing_score;
  const passed = passing !== null ? percentage >= passing : null;

  if (showReview) {
    return (
      <ReviewView
        material={material}
        questions={questions}
        answers={answers}
        onBack={() => setShowReview(false)}
      />
    );
  }

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
                    passed ? "text-emerald-600" : "text-red-500"
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

          <div className="mt-12 flex flex-col items-center gap-3">
            {totalGraded > 0 ? (
              <button
                type="button"
                onClick={() => setShowReview(true)}
                className="w-full px-6 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
              >
                Review Answers
              </button>
            ) : null}
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-1 px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Review view ───────────────────────────────────────────────────────────────

type ReviewViewProps = {
  material: Material;
  questions: QuestionWithOptions[];
  answers: Record<string, AnswerState>;
  onBack: () => void;
};

function ReviewView({ material, questions, answers, onBack }: ReviewViewProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 py-12 mx-auto w-full max-w-[900px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
              Answer Review
            </p>
            <h1 className="mt-1 text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
              {material.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
          >
            Back to results
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((question, index) => {
            const answer = answers[question.id] ?? emptyAnswer();

            if (!isChoiceType(question.type)) {
              return (
                <OpenEndedReviewCard
                  key={question.id}
                  index={index}
                  question={question}
                  openText={answer.openText}
                />
              );
            }

            const opts = safeOptions(question);
            const correct = isAnswerCorrect(question, answer);
            const correctOptions = opts.filter((o) => o.is_correct);
            const selectedIds = new Set(answer.selectedOptionIds);

            return (
              <ChoiceReviewCard
                key={question.id}
                index={index}
                question={question}
                selectedIds={selectedIds}
                correctOptions={correctOptions}
                isCorrect={correct}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

type ChoiceReviewCardProps = {
  index: number;
  question: QuestionWithOptions;
  selectedIds: Set<string>;
  correctOptions: Option[];
  isCorrect: boolean;
};

function ChoiceReviewCard({
  index,
  question,
  selectedIds,
  correctOptions,
  isCorrect,
}: ChoiceReviewCardProps) {
  const isMultiple = isMultipleType(question.type);
  const hasSelection = selectedIds.size > 0;
  const opts = safeOptions(question);

  return (
    <div className="p-6 bg-background border border-border rounded-lg">
      <div className="flex items-start gap-4">
        <span
          className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
            !hasSelection
              ? "bg-surface text-foreground/60 border border-border"
              : isCorrect
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {!hasSelection ? "–" : isCorrect ? "✓" : "✗"}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/50 mb-1">
            Question {index + 1}
            {isMultiple ? " · Multiple Response" : ""}
          </p>

          {question.image_url ? (
            <div className="mb-3 rounded border border-border overflow-hidden bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.image_url}
                alt=""
                className="w-full max-h-48 object-contain"
              />
            </div>
          ) : null}

          <p className="text-[17px] font-medium leading-[1.5] text-foreground">
            {question.question_text}
          </p>

          <div className="mt-4 space-y-2">
            {/* User's selections */}
            {hasSelection ? (
              opts
                .filter((o) => selectedIds.has(o.id))
                .map((o) => (
                  <div
                    key={o.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded border text-sm ${
                      o.is_correct
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "border-red-300 bg-red-50 text-red-700"
                    }`}
                  >
                    <span aria-hidden className="shrink-0 font-semibold">
                      {o.is_correct ? "✓" : "✗"}
                    </span>
                    <span>
                      <span className="font-medium">Your answer:</span>{" "}
                      {o.option_text}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 rounded border border-border bg-surface text-sm text-foreground/60">
                No answer selected
              </div>
            )}

            {/* Correct answers that were missed */}
            {!isCorrect
              ? correctOptions
                  .filter((o) => !selectedIds.has(o.id))
                  .map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center gap-2 px-3 py-2 rounded border border-emerald-300 bg-emerald-50 text-sm text-emerald-800"
                    >
                      <span aria-hidden className="shrink-0 font-semibold">
                        ✓
                      </span>
                      <span>
                        <span className="font-medium">
                          {isMultiple ? "Missed correct answer:" : "Correct answer:"}
                        </span>{" "}
                        {o.option_text}
                      </span>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

type OpenEndedReviewCardProps = {
  index: number;
  question: Question;
  openText: string;
};

function OpenEndedReviewCard({
  index,
  question,
  openText,
}: OpenEndedReviewCardProps) {
  return (
    <div className="p-6 bg-background border border-border rounded-lg">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-surface text-foreground/60 border border-border">
          –
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/50 mb-1">
            Question {index + 1} · Open-ended
          </p>
          {question.image_url ? (
            <div className="mb-3 rounded border border-border overflow-hidden bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.image_url}
                alt=""
                className="w-full max-h-48 object-contain"
              />
            </div>
          ) : null}
          <p className="text-[17px] font-medium leading-[1.5] text-foreground">
            {question.question_text}
          </p>
          {openText?.trim() ? (
            <div className="mt-4 px-3 py-2 rounded border border-border bg-surface text-sm text-foreground/80 leading-[1.6] whitespace-pre-wrap">
              {openText}
            </div>
          ) : (
            <p className="mt-4 text-sm text-foreground/50 italic">
              No answer written.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Layout shells ─────────────────────────────────────────────────────────────

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
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/dashboard"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </header>
  );
}
