export type QuizCategory =
  | 'general'
  | 'animals';

export type QuizDifficulty =
  | 'easy'
  | 'medium';

export interface RawQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  answers: string[];

  category: string;
  difficulty: string;
  type: string;
}