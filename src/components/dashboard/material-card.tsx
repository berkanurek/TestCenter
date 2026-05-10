import Link from "next/link";

import { Icon } from "@/components/quiz-editor/icon";
import type { MaterialWithAuthor } from "@/types";

type MaterialCardProps = {
  material: MaterialWithAuthor;
  onDelete?: (material: MaterialWithAuthor) => void;
  isDeleting?: boolean;
  onEdit?: (material: MaterialWithAuthor) => void;
};

export function MaterialCard({
  material,
  onDelete,
  isDeleting,
  onEdit,
}: MaterialCardProps) {
  const isQuiz = material.type === "quiz";
  const authorName = material.author?.full_name?.trim() || "Anonymous";

  return (
    <article className="flex flex-col p-6 bg-background border border-border rounded-lg hover:border-foreground/30 transition-colors">
      <span className="text-xs font-medium uppercase tracking-wider text-foreground/60">
        {isQuiz ? "Quiz" : "Document"}
      </span>

      <h2 className="mt-3 text-[20px] font-semibold leading-[1.3] text-foreground line-clamp-2">
        {material.title}
      </h2>

      {material.description ? (
        <p className="mt-2 text-sm leading-[1.6] text-foreground/70 line-clamp-3">
          {material.description}
        </p>
      ) : null}

      <div className="mt-4 flex items-center gap-1.5 text-xs text-foreground/60">
        {material.category ? (
          <>
            <span>{material.category}</span>
            <span aria-hidden>·</span>
          </>
        ) : null}
        <span>by {authorName}</span>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
        {/* Left actions: Delete + Edit (owner-only, passed from parent) */}
        <div className="flex items-center gap-1 -ml-1.5">
          {onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(material)}
              disabled={isDeleting}
              aria-label={`Delete ${material.title}`}
              className="text-foreground/50 hover:text-foreground p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Icon name="delete" size={18} />
              <span className="text-xs font-medium">
                {isDeleting ? "Deleting…" : "Delete"}
              </span>
            </button>
          ) : null}

          {onEdit && isQuiz ? (
            <button
              type="button"
              onClick={() => onEdit(material)}
              disabled={isDeleting}
              aria-label={`Edit ${material.title}`}
              className="text-foreground/50 hover:text-foreground p-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Icon name="edit" size={18} />
              <span className="text-xs font-medium">Edit</span>
            </button>
          ) : null}

          {!onDelete && !onEdit ? <span aria-hidden /> : null}
        </div>

        {/* Right action: Start / Open */}
        {isQuiz ? (
          <Link
            href={`/quiz/${material.id}`}
            className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
          >
            Start
            <Icon name="arrow_forward" size={18} />
          </Link>
        ) : material.file_url ? (
          <a
            href={material.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
          >
            Open
            <Icon name="open_in_new" size={18} />
          </a>
        ) : (
          <span className="text-xs text-foreground/50">No file attached</span>
        )}
      </div>
    </article>
  );
}
