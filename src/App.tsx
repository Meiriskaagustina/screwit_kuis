import { useState } from 'react';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type { Question } from './features/quiz/api/quiz.types';
import { NameForm } from './features/quiz/components/NameForm';
import { QuizCard } from './features/quiz/components/QuizCard';

export default function App() {
  const [playerName, setPlayerName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

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
      alert(`Kuis Selesai! Kamu telah menjawab semua ${questions.length} soal.`);
      // Nanti di Issue #4 akan diarahkan ke ResultView
    }
  };

  // 1. Jika belum isi nama
  if (!playerName) {
    return <NameForm onStartQuiz={handleStartQuiz} />;
  }

  // 2. Jika sedang loading ambil soal
  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        ⏳ Mengambil soal dari OpenTDB...
      </p>
    );
  }

  // 3. Tampilan Kuis dengan QuizCard
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