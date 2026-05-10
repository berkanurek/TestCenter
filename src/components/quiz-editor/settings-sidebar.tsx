"use client";

import { useState } from "react";

import { FieldInput } from "@/components/ui/field-input";
import type { AccessLevel } from "@/types";

import { Icon } from "./icon";
import {
  QUIZ_CATEGORIES,
  type QuizSettings,
  type QuizSetupData,
} from "./types";

type SettingsSection = "general" | "grading" | "access";

type NavItem = {
  id: SettingsSection;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "general", label: "General", icon: "settings" },
  { id: "grading", label: "Grading", icon: "grade" },
  { id: "access", label: "Access", icon: "lock" },
];

type SettingsSidebarProps = {
  setupData: QuizSetupData;
  onSetupChange: (next: QuizSetupData) => void;
  settings: QuizSettings;
  onSettingsChange: (next: QuizSettings) => void;
  onSave: () => void;
  isSaving: boolean;
};

export function SettingsSidebar({
  setupData,
  onSetupChange,
  settings,
  onSettingsChange,
  onSave,
  isSaving,
}: SettingsSidebarProps) {
  const [active, setActive] = useState<SettingsSection>("general");

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col p-6 bg-surface border-l border-border w-80">
      <div className="mb-8 shrink-0">
        <h2 className="text-[20px] font-semibold leading-[1.4] text-foreground mb-1">
          Settings
        </h2>
        <p className="text-[15px] leading-[1.6] text-foreground/70">
          Global Configurations
        </p>
      </div>

      <nav className="flex flex-col gap-1 shrink-0">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-4 py-2 px-4 rounded text-sm font-medium transition-all text-left ${
                isActive
                  ? "text-foreground border-l-2 border-foreground bg-background"
                  : "text-foreground/60 hover:bg-background"
              }`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto mt-6 -mx-2 px-2">
        {active === "general" ? (
          <GeneralPanel
            data={setupData}
            onChange={onSetupChange}
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        ) : null}
        {active === "grading" ? (
          <GradingPanel settings={settings} onChange={onSettingsChange} />
        ) : null}
        {active === "access" ? (
          <AccessPanel settings={settings} onChange={onSettingsChange} />
        ) : null}
      </div>

      <div className="shrink-0 mt-4">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="w-full bg-foreground text-background py-4 rounded text-sm font-medium hover:opacity-90 active:translate-x-1 transition-all disabled:opacity-50 disabled:active:translate-x-0"
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </aside>
  );
}

// ── General panel ─────────────────────────────────────────────────────────────

type GeneralPanelProps = {
  data: QuizSetupData;
  onChange: (next: QuizSetupData) => void;
  settings: QuizSettings;
  onSettingsChange: (next: QuizSettings) => void;
};

function GeneralPanel({
  data,
  onChange,
  settings,
  onSettingsChange,
}: GeneralPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="settings-description"
          className="block text-xs font-medium text-foreground/60"
        >
          Description
        </label>
        <textarea
          id="settings-description"
          rows={3}
          value={data.description}
          onChange={(event) =>
            onChange({ ...data, description: event.target.value })
          }
          placeholder="What's this quiz about?"
          className="w-full rounded border border-transparent bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-border focus:border-border resize-none"
        />
      </div>

      <FieldInput
        label="Category"
        name="settings-category"
        type="text"
        list="quiz-categories-sidebar"
        value={data.category}
        onChange={(event) =>
          onChange({ ...data, category: event.target.value })
        }
        placeholder="e.g. Science"
      />
      <datalist id="quiz-categories-sidebar">
        {QUIZ_CATEGORIES.map((entry) => (
          <option key={entry} value={entry} />
        ))}
      </datalist>

      <div className="pt-2 border-t border-border space-y-2">
        <FieldInput
          label="Time limit (minutes)"
          name="time-limit"
          type="number"
          min={0}
          step={1}
          placeholder="No limit"
          value={settings.time_limit_minutes ?? ""}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") {
              onSettingsChange({ ...settings, time_limit_minutes: null });
              return;
            }
            const parsed = Number.parseInt(raw, 10);
            if (!Number.isFinite(parsed) || parsed <= 0) {
              onSettingsChange({ ...settings, time_limit_minutes: null });
              return;
            }
            onSettingsChange({
              ...settings,
              time_limit_minutes: parsed,
            });
          }}
        />
        <p className="text-xs text-foreground/60">
          Leave empty (or 0) for no time limit.
        </p>
      </div>
    </div>
  );
}

// ── Grading panel ─────────────────────────────────────────────────────────────

type GradingPanelProps = {
  settings: QuizSettings;
  onChange: (next: QuizSettings) => void;
};

function GradingPanel({ settings, onChange }: GradingPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FieldInput
          label="Passing score (%)"
          name="passing-score"
          type="number"
          min={0}
          max={100}
          step={1}
          placeholder="None"
          value={settings.passing_score ?? ""}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") {
              onChange({ ...settings, passing_score: null });
              return;
            }
            const parsed = Number.parseInt(raw, 10);
            onChange({
              ...settings,
              passing_score: Number.isFinite(parsed)
                ? Math.min(100, Math.max(0, parsed))
                : null,
            });
          }}
        />
        <p className="text-xs text-foreground/60">
          Score required to pass (0–100). Leave empty for none.
        </p>
      </div>

      <div className="pt-2 border-t border-border">
        <ToggleRow
          id="instant-feedback"
          label="Show correct answer immediately"
          description="After each answer, reveal whether it was right or wrong before moving on."
          checked={settings.instant_feedback}
          onChange={(checked) =>
            onChange({ ...settings, instant_feedback: checked })
          }
        />
      </div>

      <div className="pt-2 border-t border-border">
        <ToggleRow
          id="mastery-mode"
          label="Mastery Mode"
          description="Wrong answers are re-queued at the end. Results appear only after all questions are mastered."
          checked={settings.mastery_mode}
          onChange={(checked) =>
            onChange({ ...settings, mastery_mode: checked })
          }
        />
      </div>
    </div>
  );
}

// ── Access panel ─────────────────────────────────────────────────────────────

type AccessOption = {
  value: AccessLevel;
  label: string;
  description: string;
  icon: string;
};

const ACCESS_OPTIONS: AccessOption[] = [
  {
    value: "public",
    label: "Public",
    description: "Visible on the Browse page for everyone.",
    icon: "public",
  },
  {
    value: "link",
    label: "Link only",
    description: "Hidden from Browse. Only people with the URL can open it.",
    icon: "link",
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can see and take this quiz.",
    icon: "lock",
  },
];

type AccessPanelProps = {
  settings: QuizSettings;
  onChange: (next: QuizSettings) => void;
};

function AccessPanel({ settings, onChange }: AccessPanelProps) {
  const current = settings.access_level;
  return (
    <div
      role="radiogroup"
      aria-label="Quiz access level"
      className="flex flex-col gap-2"
    >
      {ACCESS_OPTIONS.map((option) => {
        const isSelected = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange({ ...settings, access_level: option.value })}
            className={`text-left p-3 rounded border transition-colors ${
              isSelected
                ? "border-foreground bg-background"
                : "border-border bg-transparent hover:bg-background"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected ? "border-foreground" : "border-foreground/40"
                }`}
              >
                {isSelected ? (
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                ) : null}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Icon name={option.icon} size={16} />
                  {option.label}
                </div>
                <p className="mt-0.5 text-xs text-foreground/60 leading-[1.5]">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── ToggleRow ─────────────────────────────────────────────────────────────────

type ToggleRowProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 shrink-0 w-9 h-5 rounded-full border transition-colors ${
          checked
            ? "bg-foreground border-foreground"
            : "bg-transparent border-foreground/30 hover:border-foreground/60"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all ${
            checked ? "bg-background translate-x-4" : "bg-foreground/30"
          }`}
        />
      </button>
      <div className="flex-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground cursor-pointer"
        >
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-foreground/60 leading-[1.5]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
