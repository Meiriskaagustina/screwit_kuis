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

export type QuizThemeId = 'blue' | 'emerald' | 'amber';

export interface QuizThemeConfig {
  id: QuizThemeId;
  name: string;
  icon: string;
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  glow1: string;
  glow2: string;
  selectedBg: string;
  selectedBorder: string;
  selectedShadow: string;
  bgGradient: string;
}

export const QUIZ_THEMES: Record<QuizThemeId, QuizThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    icon: '🌊',
    primary: '#5B8DEF',
    secondary: '#6FA3A8',
    accent: '#9fc4e8',
    gradient: 'linear-gradient(135deg, #5B8DEF 0%, #6FA3A8 100%)',
    glow1: 'rgba(91,141,239,0.18)',
    glow2: 'rgba(111,163,168,0.16)',
    selectedBg: 'rgba(91,141,239,0.18)',
    selectedBorder: 'rgba(91,141,239,0.75)',
    selectedShadow: '0 10px 25px rgba(91,141,239,0.18)',
    bgGradient:
      'radial-gradient(circle at 10% 10%, rgba(91,141,239,0.18), transparent 30%),' +
      'radial-gradient(circle at 90% 5%, rgba(111,163,168,0.16), transparent 32%),' +
      'radial-gradient(circle at 50% 100%, rgba(143,179,217,0.12), transparent 38%),' +
      'linear-gradient(135deg, #172033 0%, #1d2939 50%, #243447 100%)',
  },
  emerald: {
    id: 'emerald',
    name: 'Mint Emerald',
    icon: '🌿',
    primary: '#10B981',
    secondary: '#14B8A6',
    accent: '#6EE7B7',
    gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
    glow1: 'rgba(16,185,129,0.18)',
    glow2: 'rgba(20,184,166,0.16)',
    selectedBg: 'rgba(16,185,129,0.18)',
    selectedBorder: 'rgba(16,185,129,0.75)',
    selectedShadow: '0 10px 25px rgba(16,185,129,0.18)',
    bgGradient:
      'radial-gradient(circle at 10% 10%, rgba(16,185,129,0.18), transparent 30%),' +
      'radial-gradient(circle at 90% 5%, rgba(20,184,166,0.16), transparent 32%),' +
      'radial-gradient(circle at 50% 100%, rgba(52,211,153,0.12), transparent 38%),' +
      'linear-gradient(135deg, #132723 0%, #1c3630 50%, #23453e 100%)',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Amber',
    icon: '🌅',
    primary: '#F59E0B',
    secondary: '#F97316',
    accent: '#FDE68A',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    glow1: 'rgba(245,158,11,0.18)',
    glow2: 'rgba(249,115,22,0.16)',
    selectedBg: 'rgba(245,158,11,0.18)',
    selectedBorder: 'rgba(245,158,11,0.75)',
    selectedShadow: '0 10px 25px rgba(245,158,11,0.18)',
    bgGradient:
      'radial-gradient(circle at 10% 10%, rgba(245,158,11,0.18), transparent 30%),' +
      'radial-gradient(circle at 90% 5%, rgba(249,115,22,0.16), transparent 32%),' +
      'radial-gradient(circle at 50% 100%, rgba(251,191,36,0.12), transparent 38%),' +
      'linear-gradient(135deg, #2b1f17 0%, #36281d 50%, #453224 100%)',
  },
};