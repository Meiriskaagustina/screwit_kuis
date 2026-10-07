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

export type QuizThemeId = 'purple' | 'pink' | 'yellow' | 'blue' | 'emerald' | 'amber';

export interface QuizThemeConfig {
  id: QuizThemeId;
  name: string;
  icon: string;
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  canvasBg: string;
  surface: string;
  contrastText: string;
  badgeBg: string;
  cardBg: string;
  border: string;
  shadow: string;
  shadowLg: string;
  gradient: string;
  glow1: string;
  glow2: string;
  selectedBg: string;
  selectedBorder: string;
  selectedShadow: string;
  bgGradient: string;
}

const themePurple: QuizThemeConfig = {
  id: 'purple',
  name: 'ScrewIt Purple',
  icon: '⚡',
  primary: '#8B5CF6',
  secondary: '#EC4899',
  accent: '#EC4899',
  highlight: '#FACC15',
  canvasBg: '#EDE9FE',
  surface: '#F5F3FF',
  contrastText: '#FFFFFF',
  badgeBg: '#FACC15',
  cardBg: '#F5F3FF',
  border: '#000000',
  shadow: '4px 4px 0px #000000',
  shadowLg: '6px 6px 0px #000000',
  gradient: '#8B5CF6',
  glow1: '#8B5CF6',
  glow2: '#EC4899',
  selectedBg: '#DDD6FE',
  selectedBorder: '#000000',
  selectedShadow: '4px 4px 0px #000000',
  bgGradient: '#EDE9FE',
};

const themePink: QuizThemeConfig = {
  id: 'pink',
  name: 'Hot Pink',
  icon: '💖',
  primary: '#EC4899',
  secondary: '#8B5CF6',
  accent: '#8B5CF6',
  highlight: '#FACC15',
  canvasBg: '#FCE7F3',
  surface: '#FFF1F2',
  contrastText: '#FFFFFF',
  badgeBg: '#FACC15',
  cardBg: '#FFF1F2',
  border: '#000000',
  shadow: '4px 4px 0px #000000',
  shadowLg: '6px 6px 0px #000000',
  gradient: '#EC4899',
  glow1: '#EC4899',
  glow2: '#FACC15',
  selectedBg: '#FBCFE8',
  selectedBorder: '#000000',
  selectedShadow: '4px 4px 0px #000000',
  bgGradient: '#FCE7F3',
};

const themeYellow: QuizThemeConfig = {
  id: 'yellow',
  name: 'Electric Yellow',
  icon: '⚡',
  primary: '#FACC15',
  secondary: '#EC4899',
  accent: '#8B5CF6',
  highlight: '#EC4899',
  canvasBg: '#FEF3C7',
  surface: '#FFFBEB',
  contrastText: '#000000',
  badgeBg: '#8B5CF6',
  cardBg: '#FFFBEB',
  border: '#000000',
  shadow: '4px 4px 0px #000000',
  shadowLg: '6px 6px 0px #000000',
  gradient: '#FACC15',
  glow1: '#FACC15',
  glow2: '#EC4899',
  selectedBg: '#FDE68A',
  selectedBorder: '#000000',
  selectedShadow: '4px 4px 0px #000000',
  bgGradient: '#FEF3C7',
};

export const QUIZ_THEMES: Record<QuizThemeId, QuizThemeConfig> = {
  purple: themePurple,
  pink: themePink,
  yellow: themeYellow,
  // Backward compatibility aliases
  blue: themePurple,
  emerald: themePink,
  amber: themeYellow,
};