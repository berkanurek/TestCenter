"use client";

import Link from "next/link";

import { Icon } from "./icon";

type EditorMode = "create" | "edit";

type EditorTopBarProps = {
  title: string;
  onTitleChange: (value: string) => void;
  onPublish: () => void;
  isPublishing: boolean;
  mode?: EditorMode;
  backHref?: string;
};

export function EditorTopBar({
  title,
  onTitleChange,
  onPublish,
  isPublishing,
  mode = "create",
  backHref = "/dashboard",
}: EditorTopBarProps) {
  const saveLabel = mode === "edit" ? "Save changes" : "Publish";
  const savingLabel = mode === "edit" ? "Saving…" : "Publishing…";

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center px-6 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="text-[20px] font-bold leading-[1.4] text-foreground hover:opacity-80 transition-opacity"
          aria-label="TestCenter home"
        >
          TestCenter
        </Link>
        <span aria-hidden className="text-foreground/30 text-[20px] leading-[1.4]">
          /
        </span>
        <input
          type="text"
          spellCheck={false}
          className="invisible-input text-[20px] font-semibold leading-[1.4] text-foreground w-auto min-w-[240px]"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Untitled quiz"
          aria-label="Quiz title"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="bg-surface hover:bg-border transition-colors duration-200 px-4 py-2 rounded flex items-center gap-1 text-foreground/70 text-sm font-medium"
        >
          <Icon name="download" />
          Download
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={isPublishing}
          className="bg-foreground text-background px-6 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          {isPublishing ? savingLabel : saveLabel}
        </button>
        <div className="h-6 w-px bg-border mx-1" />
        <button
          type="button"
          aria-label="Settings"
          className="p-2 hover:bg-surface rounded transition-colors duration-200"
        >
          <Icon name="settings" className="text-foreground/70" />
        </button>
        <button
          type="button"
          aria-label="More options"
          className="p-2 hover:bg-surface rounded transition-colors duration-200"
        >
          <Icon name="more_vert" className="text-foreground/70" />
        </button>
      </div>
    </header>
  );
}
