"use client";

import { useEffect, useRef, useState } from "react";

import type { QuestionType } from "@/types";

import { Icon } from "./icon";

const TYPE_META: Record<QuestionType, { label: string; icon: string }> = {
  multiple_choice: { label: "Multiple Choice", icon: "list" },
  open_ended: { label: "Open-ended", icon: "subject" },
};

const TYPE_ORDER: QuestionType[] = ["multiple_choice", "open_ended"];

type QuestionTypeSelectorProps = {
  value: QuestionType;
  onChange: (next: QuestionType) => void;
};

export function QuestionTypeSelector({
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const current = TYPE_META[value];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-surface text-foreground text-sm font-medium hover:border-foreground/30 transition-colors"
      >
        <Icon name={current.icon} size={18} />
        {current.label}
        <Icon name="expand_more" size={18} />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[180px] bg-background border border-border rounded shadow-sm z-30 overflow-hidden"
        >
          {TYPE_ORDER.map((type) => {
            const meta = TYPE_META[type];
            const isSelected = type === value;
            return (
              <button
                key={type}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(type);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors ${
                  isSelected
                    ? "bg-surface text-foreground font-medium"
                    : "text-foreground/80 hover:bg-surface"
                }`}
              >
                <Icon name={meta.icon} size={18} />
                {meta.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
