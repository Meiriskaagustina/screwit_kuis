import { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type {
  Question,
  QuizCategory,
  QuizDifficulty,
} from './features/quiz/api/quiz.types';

import { NameForm } from './features/quiz/components/NameForm';
import { QuizCard } from './features/quiz/components/QuizCard';
import { ResultView } from './features/quiz/components/ResultView';

export default function App() {
  // =========================================================
  // PLAYER
  // =========================================================

  const [playerName, setPlayerName] = useState<string>('');

  // =========================================================
  // QUIZ SETTINGS
  // =========================================================

  const [category, setCategory] =
    useState<QuizCategory>('general');

  const [difficulty, setDifficulty] =
    useState<QuizDifficulty>('easy');

  // =========================================================
  // QUESTIONS
  // =========================================================

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>('');

  // =========================================================
  // QUIZ PROGRESS
  // =========================================================

  const [currentIndex, setCurrentIndex] =
    useState<number>(0);

  const [userAnswers, setUserAnswers] =
    useState<Record<number, string>>({});

  const [isQuizFinished, setIsQuizFinished] =
    useState<boolean>(false);

  const [elapsedSeconds, setElapsedSeconds] =
    useState<number>(0);

  // =========================================================
  // START QUIZ
  // =========================================================

  const handleStartQuiz = async (
    name: string,
    selectedCategory: QuizCategory,
    selectedDifficulty: QuizDifficulty,
  ) => {
    setPlayerName(name);

    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);

    setLoading(true);
    setError('');

    setCurrentIndex(0);
    setUserAnswers({});
    setIsQuizFinished(false);
    setElapsedSeconds(0);

    try {
      /*
       * PENTING:
       * fetchQuestions sekarang menerima object,
       * bukan angka langsung.
       */

      const data = await fetchQuestions({
        amount: 10,
        category: selectedCategory,
        difficulty: selectedDifficulty,
      });

      setQuestions(data);
    } catch (err) {
      console.error('Gagal mengambil soal:', err);

      setError(
        'Gagal mengambil soal. Silakan coba lagi.',
      );

      setPlayerName('');
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  const handleSelectAnswer = (
    answer: string,
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
 const handlePreviousQuestion = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
  }
};



  // =========================================================
  // RESTART
  // =========================================================

  const handleRestart = () => {
    setPlayerName('');
    setQuestions([]);

    setCategory('general');
    setDifficulty('easy');

    setCurrentIndex(0);
    setUserAnswers({});

    setIsQuizFinished(false);
    setElapsedSeconds(0);

    setError('');
  };

  // =========================================================
  // PAGE STYLE
  // =========================================================

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',

    background:
  'radial-gradient(circle at 10% 10%, rgba(91,141,239,0.18), transparent 30%),' +
  'radial-gradient(circle at 90% 5%, rgba(111,163,168,0.16), transparent 32%),' +
  'radial-gradient(circle at 50% 100%, rgba(143,179,217,0.12), transparent 38%),' +
  'linear-gradient(135deg, #172033 0%, #1d2939 50%, #243447 100%)',

    padding: '20px',
  };

  // =========================================================
  // NAME FORM
  // =========================================================

  if (!playerName) {
    return (
      <div style={pageStyle}>
        <NameForm
          onStartQuiz={handleStartQuiz}
        />

        {error && (
          <p
            style={{
              color: '#fecaca',
              textAlign: 'center',
              marginTop: '15px',
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
  return (
    <div
      style={{
        ...pageStyle,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        style={{
          position: 'relative',
          width: 'min(420px, 90%)',
          padding: '38px 30px',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Floating glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(192,132,252,0.35)',
            filter: 'blur(30px)',
            top: '-40px',
            left: '-40px',
            pointerEvents: 'none',
          }}
        />

        {/* Dice */}
        <motion.div
          animate={{
            rotate: [0, 12, -12, 360],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: '54px',
            marginBottom: '18px',
            display: 'inline-block',
          }}
        >
          🎲
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.4,
          }}
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '-0.3px',
          }}
        >
          Menyiapkan Quiz
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          >
            ...
          </motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p
          animate={{
            opacity: [0.55, 0.9, 0.55],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            margin: '10px 0 22px',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '13px',
          }}
        >
          Mengambil soal dari OpenTDB
        </motion.p>

        {/* Loading bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.12)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '45%',
              height: '100%',
              borderRadius: '999px',
              background:
                'linear-gradient(90deg, #fbbf24, #fb7185, #c084fc)',
            }}
          />
        </div>

        {/* Small status */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          style={{
            marginTop: '15px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          ✨ Hampir siap...
        </motion.div>
      </motion.div>
    </div>
  );
}

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div
        style={{
          ...pageStyle,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '450px',
            width: '100%',
            padding: '30px',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.12)',
            border:
              '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              fontSize: '45px',
              marginBottom: '12px',
            }}
          >
            😵
          </div>

          <h2
            style={{
              margin: 0,
            }}
          >
            Oops!
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {error}
          </p>

          <button
            type="button"
            onClick={handleRestart}
            style={{
              border: 'none',
              borderRadius: '14px',
              padding: '13px 20px',
              background:
                'linear-gradient(135deg, #fbbf24, #fb7185, #c084fc)',
              color: '#ffffff',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // RESULT
  // =========================================================

  if (isQuizFinished) {
    return (
      <ResultView
        playerName={playerName}
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        timeTakenSeconds={elapsedSeconds}

        // INI YANG TADI KURANG
        category={category}
        difficulty={difficulty}
      />
    );
  }

  // =========================================================
  // QUIZ
  // =========================================================

  if (questions.length > 0) {
    const currentQuestion =
      questions[currentIndex];

    const selectedAnswer =
      userAnswers[currentIndex] || null;

    return (
      <div style={pageStyle}>
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'sans-serif',
            color: '#ffffff',
            marginBottom: '20px',
          }}
        >
          Semangat, {playerName}! 💪
        </h2>

        <QuizCard
          question={currentQuestion}
  currentIndex={currentIndex}
  totalQuestions={questions.length}
  selectedAnswer={selectedAnswer}
  onSelectAnswer={handleSelectAnswer}
  onNextQuestion={handleNextQuestion}
  onPreviousQuestion={handlePreviousQuestion}
  onTick={setElapsedSeconds}

        />
      </div>
    );
  }

  return null;
}