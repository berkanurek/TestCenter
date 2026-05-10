"use client";

import { useState } from "react";

import { FieldInput } from "@/components/ui/field-input";

import { Icon } from "./icon";
import {
  QUIZ_CATEGORIES,
  type QuizSettings,
  type QuizSetupData,
} from "./types";

type SettingsSection = "general" | "timing" | "grading" | "access";

type NavItem = {
  id: SettingsSection;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "general", label: "General", icon: "settings" },
  { id: "timing", label: "Timing", icon: "timer" },
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
          <GeneralPanel data={setupData} onChange={onSetupChange} />
        ) : null}
        {active === "timing" ? (
          <TimingPanel
            settings={settings}
            onChange={onSettingsChange}
          />
        ) : null}
        {active === "grading" ? (
          <GradingPanel
            settings={settings}
            onChange={onSettingsChange}
          />
        ) : null}
        {active === "access" ? <AccessPanel /> : null}
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

type GeneralPanelProps = {
  data: QuizSetupData;
  onChange: (next: QuizSetupData) => void;
};

function GeneralPanel({ data, onChange }: GeneralPanelProps) {
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
    </div>
  );
}

type TimingPanelProps = {
  settings: QuizSettings;
  onChange: (next: QuizSettings) => void;
};

function TimingPanel({ settings, onChange }: TimingPanelProps) {
  return (
    <div className="space-y-2">
      <FieldInput
        label="Time limit (minutes)"
        name="time-limit"
        type="number"
        min={1}
        step={1}
        placeholder="No limit"
        value={settings.time_limit_minutes ?? ""}
        onChange={(event) => {
          const raw = event.target.value;
          if (raw === "") {
            onChange({ ...settings, time_limit_minutes: null });
            return;
          }
          const parsed = Number.parseInt(raw, 10);
          onChange({
            ...settings,
            time_limit_minutes: Number.isFinite(parsed)
              ? Math.max(1, parsed)
              : null,
          });
        }}
      />
      <p className="text-xs text-foreground/60">
        Leave empty for no time limit.
      </p>
    </div>
  );
}

type GradingPanelProps = {
  settings: QuizSettings;
  onChange: (next: QuizSettings) => void;
};

function GradingPanel({ settings, onChange }: GradingPanelProps) {
  return (
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
  );
}

function AccessPanel() {
  return (
    <p className="text-sm text-foreground/60">
      Access controls are coming soon.
    </p>
  );
}
