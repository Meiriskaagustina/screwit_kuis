import { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type {
  Question,
  QuizCategory,
  QuizDifficulty,
  QuizThemeId,
} from './features/quiz/api/quiz.types';
import { QUIZ_THEMES } from './features/quiz/api/quiz.types';

import { NameForm } from './features/quiz/components/NameForm';
import { QuizCard } from './features/quiz/components/QuizCard';
import { ResultView } from './features/quiz/components/ResultView';

function ThemeSwitcher({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: QuizThemeId;
  onThemeChange: (themeId: QuizThemeId) => void;
}) {
  const themesList = Object.values(QUIZ_THEMES);

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.20)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 800,
          color: 'rgba(255, 255, 255, 0.65)',
          marginRight: '2px',
          paddingLeft: '4px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        TEMA:
      </span>
      {themesList.map((t) => {
        const isActive = t.id === currentTheme;
        return (
          <motion.button
            key={t.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onThemeChange(t.id)}
            title={t.name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              borderRadius: '999px',
              border: isActive
                ? `1.5px solid ${t.primary}`
                : '1px solid rgba(255, 255, 255, 0.14)',
              background: isActive
                ? t.selectedBg
                : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: isActive ? 800 : 600,
              cursor: 'pointer',
              boxShadow: isActive ? `0 0 12px ${t.glow1}` : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function App() {
  // =========================================================
  // THEME
  // =========================================================

  const [currentThemeId, setCurrentThemeId] = useState<QuizThemeId>('blue');
  const currentThemeConfig = QUIZ_THEMES[currentThemeId];

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

    background: currentThemeConfig.bgGradient,

    padding: '24px 18px',

    transition: 'background 0.5s ease',
  };

  // =========================================================
  // NAME FORM
  // =========================================================

  if (!playerName) {
    return (
      <div style={pageStyle}>
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <NameForm
          onStartQuiz={handleStartQuiz}
          themeConfig={currentThemeConfig}
        />

        {error && (
          <p
            style={{
              color: '#f89898',
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
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
          style={{
            position: 'relative',
            width: 'min(420px, 90%)',
            padding: '40px 32px',
            borderRadius: '28px',
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))',
            border: '1px solid rgba(255,255,255,0.20)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 30px 70px rgba(17,24,39,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Floating calm glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: currentThemeConfig.glow1,
              filter: 'blur(30px)',
              top: '-40px',
              left: '-40px',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 360],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              fontSize: '52px',
              marginBottom: '18px',
              display: 'inline-block',
            }}
          >
            🎯
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.3,
            }}
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
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
              opacity: [0.6, 0.95, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              margin: '8px 0 24px',
              color: currentThemeConfig.accent,
              fontSize: '13px',
              fontWeight: 500,
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
              background: 'rgba(255,255,255,0.10)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '45%',
                height: '100%',
                borderRadius: '999px',
                background: currentThemeConfig.gradient,
                boxShadow: `0 0 10px ${currentThemeConfig.glow1}`,
              }}
            />
          </div>

          {/* Small status */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            style={{
              marginTop: '16px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 600,
            }}
          >
            Hampir siap...
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
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            maxWidth: '450px',
            width: '100%',
            padding: '36px 30px',
            borderRadius: '28px',
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))',
            border: '1px solid rgba(255,255,255,0.20)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 30px 70px rgba(17,24,39,0.32)',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '14px',
            }}
          >
            😵
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            Terjadi Kesalahan
          </h2>

          <p
            style={{
              color: '#f89898',
              margin: '10px 0 24px',
              fontSize: '13.5px',
              lineHeight: 1.5,
            }}
          >
            {error}
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRestart}
            style={{
              border: 'none',
              borderRadius: '16px',
              padding: '14px 24px',
              background: currentThemeConfig.gradient,
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: `0 10px 25px ${currentThemeConfig.glow1}`,
            }}
          >
            🔄 Coba Lagi
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // RESULT
  // =========================================================

  if (isQuizFinished) {
    return (
      <div style={pageStyle}>
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <ResultView
          playerName={playerName}
          questions={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
          timeTakenSeconds={elapsedSeconds}
          category={category}
          difficulty={difficulty}
          themeConfig={currentThemeConfig}
        />
      </div>
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
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <div
          style={{
            textAlign: 'center',
            marginBottom: '4px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: '10px 0 0',
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Semangat, <span style={{ color: currentThemeConfig.accent }}>{playerName}</span>! 💪
          </motion.h2>
        </div>

        <QuizCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onTick={setElapsedSeconds}
          themeConfig={currentThemeConfig}
        />
      </div>
    );
  }

  return null;
}
