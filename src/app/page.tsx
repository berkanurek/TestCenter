import Link from "next/link";

import { Icon } from "@/components/quiz-editor/icon";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top nav ─────────────────────────────────────────────── */}
      <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
        <Link
          href="/"
          className="text-[20px] font-bold tracking-tight text-foreground"
        >
          TestCenter
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded bg-foreground text-background text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/50 mb-6">
            <span className="w-1 h-1 rounded-full bg-foreground/30 inline-block" />
            Free · Open · Educational
            <span className="w-1 h-1 rounded-full bg-foreground/30 inline-block" />
          </span>

          <h1 className="text-[52px] sm:text-[60px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            Master Your Knowledge
            <br />
            with TestCenter.
          </h1>

          <p className="mt-6 text-[18px] leading-[1.7] text-foreground/60 max-w-xl mx-auto">
            Create interactive quizzes, share study PDFs, and track your
            progress — all in one clean, distraction-free platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="px-7 py-3 rounded bg-foreground text-background text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Get started for free
              <Icon name="arrow_forward" size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="px-7 py-3 rounded border border-border text-foreground text-sm font-medium hover:bg-surface transition-colors flex items-center justify-center gap-2"
            >
              Browse content
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-foreground/40 mb-10">
            Everything you need to study smarter
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FeatureCard
              icon="quiz"
              title="Create Quizzes"
              description="Build multiple-choice or open-ended quizzes in minutes. Set a timer, passing score, and share with anyone."
            />
            <FeatureCard
              icon="upload_file"
              title="Upload PDFs"
              description="Turn your handwritten notes or lecture slides into searchable study materials your classmates can access."
            />
            <FeatureCard
              icon="bar_chart"
              title="Track Results"
              description="Every quiz attempt is saved. See your score history and identify which topics need more work."
            />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="bg-foreground text-background py-20 px-6 text-center">
        <h2 className="text-[30px] font-bold leading-[1.2] tracking-tight">
          Ready to start learning?
        </h2>
        <p className="mt-3 text-base text-background/60 max-w-sm mx-auto">
          Join thousands of students already using TestCenter to study smarter.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded bg-background text-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
        >
          Get Started for Free
          <Icon name="arrow_forward" size={18} />
        </Link>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="h-14 px-6 border-t border-foreground/10 bg-foreground flex items-center justify-between">
        <span className="text-xs text-background/40">
          © {new Date().getFullYear()} TestCenter
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-xs text-background/40 hover:text-background/70 transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/register"
            className="text-xs text-background/40 hover:text-background/70 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-background border border-border rounded-lg flex flex-col gap-3">
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
        <Icon name={icon} size={20} filled className="text-foreground/70" />
      </div>
      <h3 className="text-[15px] font-semibold leading-[1.3] text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-[1.6] text-foreground/60">{description}</p>
    </div>
  );
}
