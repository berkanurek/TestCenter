import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          TestCenter
        </h1>
        <p className="mt-4 text-base leading-[1.6] text-foreground/60">
          An educational knowledge-sharing platform for study materials and
          interactive quizzes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
