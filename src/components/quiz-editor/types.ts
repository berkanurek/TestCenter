import type { AccessLevel, QuestionType } from "@/types";

export interface DraftOption {
  id: string;
  option_text: string;
  is_correct: boolean;
}

export interface DraftQuestion {
  id: string;
  question_text: string;
  type: QuestionType;
  options: DraftOption[];
  image_url: string | null;
}

export interface QuizSetupData {
  title: string;
  description: string;
  category: string;
}

export interface QuizSettings {
  time_limit_minutes: number | null;
  passing_score: number | null;
  instant_feedback: boolean;
  mastery_mode: boolean;
  access_level: AccessLevel;
}

export const QUIZ_CATEGORIES = [
  "Science",
  "Math",
  "Language",
  "History",
  "Geography",
  "Computer Science",
  "Literature",
  "Art",
  "Music",
  "Other",
] as const;

export function createDraftOption(): DraftOption {
  return {
    id: crypto.randomUUID(),
    option_text: "",
    is_correct: false,
  };
}

export function createDraftQuestion(): DraftQuestion {
  return {
    id: crypto.randomUUID(),
    question_text: "",
    type: "single",
    options: [createDraftOption(), createDraftOption()],
    image_url: null,
  };
}
