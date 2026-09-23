import { useState } from 'react';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type { Question } from './features/quiz/api/quiz.types';
import { NameForm } from './features/quiz/components/NameForm';
import { QuizCard } from './features/quiz/components/QuizCard';
import { ResultView } from './features/quiz/components/ResultView';

export default function App() {
  const [playerName, setPlayerName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const handleStartQuiz = (name: string) => {
    setPlayerName(name);
    setLoading(true);

    fetchQuestions(5).then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  };

  const handleSelectAnswer = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true); // Tandai kuis selesai
    }
  };

  const handleRestart = () => {
    setPlayerName('');
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsQuizFinished(false);
  };

  // 1. Tampilan awal jika belum isi nama
  if (!playerName) {
    return <NameForm onStartQuiz={handleStartQuiz} />;
  }

  // 2. Tampilan loading saat fetch data
  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        ⏳ Mengambil soal dari OpenTDB...
      </p>
    );
  }

  // 3. Tampilan Hasil Kuis (ResultView)
  if (isQuizFinished) {
    return (
      <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
        <ResultView
          playerName={playerName}
          questions={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // 4. Tampilan Soal Kuis (QuizCard)
  if (questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = userAnswers[currentIndex] || null;

    return (
      <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'sans-serif', color: '#1f2937' }}>
          Semangat, {playerName}! 💪
        </h2>
        <QuizCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    );
  }

  return null;
}