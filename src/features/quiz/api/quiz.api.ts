import axios from 'axios';
import type { Question, RawQuestion } from './quiz.types'; // Tambahkan kata 'type'

export const fetchQuestions = async (amount: number = 10): Promise<Question[]> => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&encode=url3986`);

  return response.data.results.map((q: RawQuestion, index: number) => {
    const decodedQuestion = decodeURIComponent(q.question);
    const decodedCorrect = decodeURIComponent(q.correct_answer);
    const decodedIncorrect = q.incorrect_answers.map((ans) => decodeURIComponent(ans));

    // Gabungkan & acak opsi jawaban
    const allAnswers = [...decodedIncorrect, decodedCorrect].sort(() => Math.random() - 0.5);

    return {
      id: index + 1,
      question: decodedQuestion,
      correctAnswer: decodedCorrect,
      answers: allAnswers,
    };
  });
};