export type MaterialType = "quiz" | "document";
export type QuestionType = "multiple_choice" | "open_ended";

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
  created_at: string;
}

export interface Question {
  id: string;
  material_id: string;
  question_text: string;
  type: QuestionType;
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
