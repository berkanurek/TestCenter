export type MaterialType = "quiz" | "document";
// "single" = radio (one correct); "multiple" = checkboxes (≥1 correct)
// "multiple_choice" kept for backward compatibility with existing rows
export type QuestionType = "single" | "multiple" | "open_ended" | "multiple_choice";
export type AccessLevel = "public" | "link" | "private";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export interface Material {
  id: string;
  title: string;
  description: string | null;
  type: MaterialType;
  user_id: string;
  file_url: string | null;
  category: string | null;
  time_limit_minutes: number | null;
  passing_score: number | null;
  // Booleans are nullable so the UI keeps working even before the SQL
  // migrations for these columns have been applied to the materials table.
  instant_feedback: boolean | null;
  mastery_mode: boolean | null;
  access_level: AccessLevel | null;
  created_at: string;
}

export interface Question {
  id: string;
  material_id: string;
  question_text: string;
  type: QuestionType;
  image_url: string | null;
}

export interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

export interface Result {
  id: string;
  user_id: string;
  material_id: string;
  score: number;
  total_questions: number;
  created_at: string;
}

export interface QuestionWithOptions extends Question {
  options: Option[];
}

export interface MaterialWithAuthor extends Material {
  author: Pick<User, "id" | "full_name"> | null;
}
