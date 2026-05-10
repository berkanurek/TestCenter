"use client";

import type { QuestionType } from "@/types";

import { Icon } from "./icon";
import { QuestionTypeSelector } from "./question-type-selector";
import {
  createDraftOption,
  type DraftOption,
  type DraftQuestion,
} from "./types";

type QuestionCardProps = {
  question: DraftQuestion;
  index: number;
  onChange: (next: DraftQuestion) => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function QuestionCard({
  question,
  index,
  onChange,
  onDuplicate,
  onDelete,
}: QuestionCardProps) {
  function patch(partial: Partial<DraftQuestion>) {
    onChange({ ...question, ...partial });
  }

  function handleTypeChange(nextType: QuestionType) {
    const currentDisplay =
      question.type === "multiple_choice" ? "single" : question.type;
    if (nextType === currentDisplay) return;

    if (nextType === "open_ended") {
      patch({ type: nextType, options: [] });
      return;
    }

    const options =
      question.options.length > 0
        ? question.options
        : [createDraftOption(), createDraftOption()];

    if (nextType === "single") {
      // Ensure only the first correct option stays correct
      let foundCorrect = false;
      const normalizedOptions = options.map((opt) => {
        if (opt.is_correct && !foundCorrect) {
          foundCorrect = true;
          return opt;
        }
        return { ...opt, is_correct: false };
      });
      patch({ type: nextType, options: normalizedOptions });
      return;
    }

    // "multiple": keep all existing correctness values
    patch({ type: nextType, options });
  }

  function handleOptionChange(optionId: string, next: Partial<DraftOption>) {
    patch({
      options: question.options.map((option) =>
        option.id === optionId ? { ...option, ...next } : option
      ),
    });
  }

  function handleCorrectChange(optionId: string) {
    if (question.type === "multiple") {
      // Toggle for multi-select
      patch({
        options: question.options.map((option) =>
          option.id === optionId
            ? { ...option, is_correct: !option.is_correct }
            : option
        ),
      });
    } else {
      // Single correct for radio
      patch({
        options: question.options.map((option) => ({
          ...option,
          is_correct: option.id === optionId,
        })),
      });
    }
  }

  function handleAddOption() {
    patch({ options: [...question.options, createDraftOption()] });
  }

  function handleRemoveOption(optionId: string) {
    if (question.options.length <= 1) return;
    patch({
      options: question.options.filter((option) => option.id !== optionId),
    });
  }

  const isChoiceType =
    question.type === "single" ||
    question.type === "multiple" ||
    question.type === "multiple_choice";

  const placeholder =
    question.type === "open_ended"
      ? "Explain the process of photosynthesis."
      : "What is the capital of France?";

  return (
    <article className="p-10 bg-background border border-border rounded-lg group transition-all hover:border-foreground/30">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 text-foreground/70">
          <Icon name="drag_indicator" />
          <span className="text-xs font-medium uppercase tracking-wider">
            Question {index + 1}
          </span>
        </div>
        <QuestionTypeSelector
          value={question.type}
          onChange={handleTypeChange}
        />
      </div>

      <div className="mb-6">
        <input
          type="text"
          spellCheck={false}
          className="invisible-input text-[24px] font-semibold leading-[1.4] text-foreground py-2 transition-all"
          placeholder={placeholder}
          value={question.question_text}
          onChange={(event) => patch({ question_text: event.target.value })}
          aria-label={`Question ${index + 1} text`}
        />
      </div>

      {/* Image URL field */}
      <div className="mb-8">
        <ImageUrlField
          value={question.image_url}
          onChange={(url) => patch({ image_url: url })}
        />
      </div>

      {isChoiceType ? (
        <ChoiceOptions
          options={question.options}
          isMultiple={question.type === "multiple"}
          onOptionChange={handleOptionChange}
          onCorrectChange={handleCorrectChange}
          onAddOption={handleAddOption}
          onRemoveOption={handleRemoveOption}
        />
      ) : (
        <OpenEndedPreview />
      )}

      <div className="mt-6 flex justify-end">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDuplicate}
            aria-label="Duplicate question"
            className="p-1 hover:bg-surface rounded transition-colors"
          >
            <Icon name="content_copy" className="text-foreground/70" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete question"
            className="p-1 hover:bg-surface rounded transition-colors"
          >
            <Icon name="delete" className="text-foreground/70" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Image URL field ───────────────────────────────────────────────────────────

type ImageUrlFieldProps = {
  value: string | null;
  onChange: (url: string | null) => void;
};

function ImageUrlField({ value, onChange }: ImageUrlFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground/50 mb-1.5">
        Question image — URL (optional)
      </label>
      <input
        type="url"
        spellCheck={false}
        placeholder="https://example.com/image.png"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value.trim() || null)}
        className="w-full rounded border border-transparent bg-transparent px-0 py-1 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-colors hover:border-transparent focus:border-transparent"
        style={{ borderBottom: "1px solid" }}
      />
      {value ? (
        <div className="mt-3 relative group/img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Question image preview"
            className="rounded border border-border max-h-48 w-full object-contain bg-surface"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove image"
            className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity p-1 bg-background border border-border rounded hover:bg-surface"
          >
            <Icon name="close" size={14} className="text-foreground/70" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

// ── Choice options ─────────────────────────────────────────────────────────────

type ChoiceOptionsProps = {
  options: DraftOption[];
  isMultiple: boolean;
  onOptionChange: (optionId: string, next: Partial<DraftOption>) => void;
  onCorrectChange: (optionId: string) => void;
  onAddOption: () => void;
  onRemoveOption: (optionId: string) => void;
};

function ChoiceOptions({
  options,
  isMultiple,
  onOptionChange,
  onCorrectChange,
  onAddOption,
  onRemoveOption,
}: ChoiceOptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {isMultiple ? (
        <p className="text-xs text-foreground/50 -mt-2">
          Check all options that are correct.
        </p>
      ) : null}
      {options.map((option) => (
        <OptionRow
          key={option.id}
          option={option}
          isMultiple={isMultiple}
          canRemove={options.length > 1}
          onTextChange={(text) =>
            onOptionChange(option.id, { option_text: text })
          }
          onMarkCorrect={() => onCorrectChange(option.id)}
          onRemove={() => onRemoveOption(option.id)}
        />
      ))}
      <button
        type="button"
        onClick={onAddOption}
        className="flex items-center gap-2 text-foreground/60 text-sm font-medium mt-2 hover:text-foreground transition-colors w-fit"
      >
        <Icon name="add" size={20} />
        Add option
      </button>
    </div>
  );
}

type OptionRowProps = {
  option: DraftOption;
  isMultiple: boolean;
  canRemove: boolean;
  onTextChange: (text: string) => void;
  onMarkCorrect: () => void;
  onRemove: () => void;
};

function OptionRow({
  option,
  isMultiple,
  canRemove,
  onTextChange,
  onMarkCorrect,
  onRemove,
}: OptionRowProps) {
  return (
    <div className="flex items-center gap-4 group/option">
      <button
        type="button"
        onClick={onMarkCorrect}
        aria-label={
          option.is_correct ? "Correct answer" : "Mark as correct answer"
        }
        aria-pressed={option.is_correct}
        className={`flex items-center justify-center cursor-pointer hover:border-foreground transition-colors flex-shrink-0 ${
          isMultiple
            ? "w-4 h-4 border border-border rounded flex-shrink-0"
            : "w-4 h-4 border border-border rounded-full flex-shrink-0"
        }`}
      >
        {option.is_correct ? (
          isMultiple ? (
            <span className="w-2.5 h-2.5 bg-foreground rounded-sm" />
          ) : (
            <span className="w-2 h-2 bg-foreground rounded-full" />
          )
        ) : null}
      </button>
      <input
        type="text"
        spellCheck={false}
        className="invisible-input text-[17px] leading-[1.6] text-foreground py-1 flex-1"
        placeholder="Option text"
        value={option.option_text}
        onChange={(event) => onTextChange(event.target.value)}
        aria-label="Option text"
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label="Remove option"
        className="opacity-0 group-hover/option:opacity-100 transition-opacity disabled:opacity-0"
      >
        <Icon name="close" className="text-foreground/70" />
      </button>
    </div>
  );
}

function OpenEndedPreview() {
  return (
    <div className="w-full">
      <div className="p-6 bg-surface border border-dashed border-border rounded-lg min-h-[120px] text-foreground/50 text-[15px] flex items-center justify-center italic">
        Answer field (User input area)
      </div>
    </div>
  );
}
