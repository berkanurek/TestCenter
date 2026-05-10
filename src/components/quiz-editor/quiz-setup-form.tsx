"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FieldInput } from "@/components/ui/field-input";

import { Icon } from "./icon";
import { QUIZ_CATEGORIES, type QuizSetupData } from "./types";

type QuizSetupFormProps = {
  initialData?: QuizSetupData;
  onComplete: (data: QuizSetupData) => void;
};

export function QuizSetupForm({
  initialData,
  onComplete,
}: QuizSetupFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim();

    if (!trimmedTitle) {
      setErrorMessage("Add a title for your quiz.");
      return;
    }
    if (!trimmedDescription) {
      setErrorMessage("Add a short description so students know what to expect.");
      return;
    }
    if (!trimmedCategory) {
      setErrorMessage("Pick a category for your quiz.");
      return;
    }

    setErrorMessage(null);
    onComplete({
      title: trimmedTitle,
      description: trimmedDescription,
      category: trimmedCategory,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          New quiz
        </p>
        <h1 className="mt-2 text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
          Set up the basics
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          You can change these any time from the editor sidebar.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <FieldInput
            label="Quiz title"
            name="title"
            type="text"
            placeholder="e.g. Midterm Exam — Biology"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="quiz-description"
              className="block text-xs font-medium text-foreground/60"
            >
              Description
            </label>
            <textarea
              id="quiz-description"
              rows={3}
              placeholder="e.g. A quick test to review Chapter 4."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded border border-transparent bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-border focus:border-border resize-none"
            />
          </div>

          <FieldInput
            label="Category"
            name="category"
            type="text"
            list="quiz-categories"
            placeholder="e.g. Science"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
          <datalist id="quiz-categories">
            {QUIZ_CATEGORIES.map((entry) => (
              <option key={entry} value={entry} />
            ))}
          </datalist>

          {errorMessage ? (
            <p role="alert" className="text-sm text-foreground">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-4 w-full rounded bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Start writing questions
            <Icon name="arrow_forward" size={18} />
          </button>
        </form>

        <p className="mt-8 text-sm text-foreground/60 text-center">
          <Link
            href="/dashboard"
            className="text-foreground/70 underline-offset-4 hover:underline"
          >
            Cancel and go back
          </Link>
        </p>
      </div>
    </main>
  );
}
