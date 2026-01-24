export interface QuestionOption {
  text: string;
}

export interface Question {
  id: string;
  categoryId: 'general' | 'air_brakes' | 'safety_round' | 'law_regs';
  question: string;
  imageUri?: string | null;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  label: string;
  description?: string;
}

export type RootStackParamList = {
  Dashboard: undefined;
  TopicSelection: undefined;
  Quiz: { categoryId: string; mode: 'practice' | 'exam' };
  SafetyCheck: undefined;
  Result: { score: number; total: number; errors: Question[] };
  Settings: undefined;
};