"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";

import { Icon } from "@/components/quiz-editor/icon";
import { QUIZ_CATEGORIES } from "@/components/quiz-editor/types";
import { FieldInput } from "@/components/ui/field-input";
import { supabaseBrowser as supabase } from "@/lib/supabase-browser";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB (5,242,880 bytes)
const ACCEPTED_MIME_TYPE = "application/pdf";

export function UploadDocumentForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileSelect(selected: File | null) {
    setErrorMessage(null);

    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.type !== ACCEPTED_MIME_TYPE) {
      setErrorMessage("Please choose a PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage("File is too large. Maximum size is 5 MB.");
      return;
    }

    setFile(selected);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!isDragging) setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setErrorMessage("Add a title for your document.");
      return;
    }
    if (!trimmedCategory) {
      setErrorMessage("Pick a category for your document.");
      return;
    }
    if (!file) {
      setErrorMessage("Add a PDF file to upload.");
      return;
    }

    setIsUploading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setErrorMessage("You must be signed in to share a document.");
      setIsUploading(false);
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `${userData.user.id}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, {
        contentType: ACCEPTED_MIME_TYPE,
        upsert: false,
      });

    if (uploadError) {
      setErrorMessage(`Upload failed: ${uploadError.message}`);
      setIsUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("materials").insert({
      title: trimmedTitle,
      description: trimmedDescription || null,
      category: trimmedCategory,
      type: "document",
      user_id: userData.user.id,
      file_url: publicUrlData.publicUrl,
      time_limit_minutes: null,
      passing_score: null,
    });

    if (insertError) {
      // Roll back the upload so we don't leave an orphan file behind.
      await supabase.storage.from("documents").remove([filePath]);
      setErrorMessage(`Could not save document: ${insertError.message}`);
      setIsUploading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1 px-6 py-12 mx-auto w-full max-w-md">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          New document
        </p>
        <h1 className="mt-2 text-[24px] font-semibold leading-[1.3] tracking-tight text-foreground">
          Share study notes
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Upload a PDF and share it with the TestCenter community.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <FieldInput
            label="Title"
            name="title"
            type="text"
            placeholder="e.g. Cell Biology — Chapter 4 Notes"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="document-description"
              className="block text-xs font-medium text-foreground/60"
            >
              Description
            </label>
            <textarea
              id="document-description"
              rows={3}
              placeholder="Brief summary of what's inside."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded border border-transparent bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-border focus:border-border resize-none"
            />
          </div>

          <FieldInput
            label="Category"
            name="category"
            type="text"
            list="document-categories"
            placeholder="e.g. Science"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
          <datalist id="document-categories">
            {QUIZ_CATEGORIES.map((entry) => (
              <option key={entry} value={entry} />
            ))}
          </datalist>

          <div className="space-y-1.5">
            <span className="block text-xs font-medium text-foreground/60">
              File
            </span>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full p-8 border border-dashed rounded-lg transition-colors ${
                isDragging
                  ? "border-foreground bg-surface"
                  : file
                    ? "border-foreground/40"
                    : "border-border hover:bg-surface"
              }`}
            >
              {file ? (
                <div className="flex items-center gap-3">
                  <Icon
                    name="picture_as_pdf"
                    size={32}
                    className="text-foreground/70 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileSelect(null)}
                    className="text-foreground/60 hover:text-foreground p-1 rounded transition-colors shrink-0"
                    aria-label="Remove file"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center gap-2 text-center"
                >
                  <Icon
                    name="upload_file"
                    size={32}
                    className="text-foreground/60"
                  />
                  <p className="text-sm text-foreground">
                    Drop a PDF here, or click to browse
                  </p>
                  <p className="text-xs text-foreground/60">
                    PDF up to 5 MB
                  </p>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_MIME_TYPE}
                onChange={(event) =>
                  handleFileSelect(event.target.files?.[0] ?? null)
                }
                className="sr-only"
              />
            </div>
          </div>

          {errorMessage ? (
            <p role="alert" className="text-sm text-foreground">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isUploading}
            className="mt-4 w-full rounded bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isUploading ? "Uploading…" : "Share document"}
            {isUploading ? null : <Icon name="arrow_forward" size={18} />}
          </button>
        </form>
      </main>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
