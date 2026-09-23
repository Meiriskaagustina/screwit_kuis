import axios from 'axios';
import type { Question, RawQuestion } from './quiz.types';

export type QuizCategory = 'general' | 'animals';
export type QuizDifficulty = 'easy' | 'medium';

interface FetchQuestionsOptions {
  amount?: number;
  category: QuizCategory;
  difficulty: QuizDifficulty;
}

interface CategoryConfig {
  id: number;
  label: string;
  type: 'boolean' | 'multiple';
  difficulties: QuizDifficulty[];
}

export const categoryConfig: Record<
  QuizCategory,
  CategoryConfig
> = {
  general: {
    id: 9,
    label: 'General Knowledge',
    type: 'boolean',
    difficulties: ['easy', 'medium'],
  },

  animals: {
    id: 27,
    label: 'Animals',
    type: 'multiple',
    difficulties: ['medium'],
  },
};

export const fetchQuestions = async ({
  amount = 10,
  category,
  difficulty,
}: FetchQuestionsOptions): Promise<Question[]> => {
  const config = categoryConfig[category];

  if (!config.difficulties.includes(difficulty)) {
    throw new Error(
      `Difficulty "${difficulty}" tidak tersedia untuk kategori "${config.label}".`,
    );
  }

  const response = await axios.get(
    'https://opentdb.com/api.php',
    {
      params: {
        amount,
        category: config.id,
        difficulty,
        type: config.type,
        encode: 'url3986',
      },
    },
  );

  if (response.data.response_code !== 0) {
    throw new Error(
      `OpenTDB gagal mengambil soal. Response code: ${response.data.response_code}`,
    );
  }

  return response.data.results.map(
    (q: RawQuestion, index: number) => {
      const decodedQuestion = decodeURIComponent(q.question);
      const decodedCorrect = decodeURIComponent(q.correct_answer);

      const decodedIncorrect = q.incorrect_answers.map(
        (answer) => decodeURIComponent(answer),
      );

      // Gabungkan jawaban benar dan salah kemudian acak
      const allAnswers = [
        ...decodedIncorrect,
        decodedCorrect,
      ].sort(() => Math.random() - 0.5);

      return {
        id: index + 1,

        category: q.category,

        difficulty: q.difficulty,

        type: q.type,

        question: decodedQuestion,

        correctAnswer: decodedCorrect,

        answers: allAnswers,
      };
    },
  );
};