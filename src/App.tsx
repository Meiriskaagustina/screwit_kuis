import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type {
  Question,
  QuizCategory,
  QuizDifficulty,
  QuizThemeConfig,
  QuizThemeId,
} from './features/quiz/api/quiz.types';
import { QUIZ_THEMES } from './features/quiz/api/quiz.types';

import { NameForm } from './features/quiz/components/NameForm';
import { QuizCard } from './features/quiz/components/QuizCard';
import { ResultView } from './features/quiz/components/ResultView';

function QuizToaster({ themeConfig }: { themeConfig: QuizThemeConfig }) {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      toastOptions={{
        duration: 2500,
        style: {
          background: themeConfig.surface,
          color: '#000000',
          border: '3px solid #000000',
          borderRadius: '12px',
          padding: '12px 18px',
          fontSize: '14px',
          fontWeight: 800,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          boxShadow: '5px 5px 0px #000000',
        },
        success: {
          iconTheme: {
            primary: '#000000',
            secondary: themeConfig.primary,
          },
        },
        error: {
          iconTheme: {
            primary: '#000000',
            secondary: '#EF4444',
          },
        },
      }}
    />
  );
}

function ThemeSwitcher({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: QuizThemeId;
  onThemeChange: (themeId: QuizThemeId) => void;
}) {
  const availableThemeKeys: QuizThemeId[] = ['purple', 'pink', 'yellow'];
  const themesList = availableThemeKeys.map((key) => QUIZ_THEMES[key]);

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
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 900,
          color: '#000000',
          marginRight: '2px',
          paddingLeft: '2px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span>🎨</span> THEME:
      </span>
      {themesList.map((t) => {
        const isActive = t.id === currentTheme;
        const textColor = t.contrastText;

        return (
          <motion.button
            key={t.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ y: 2 }}
            onClick={() => {
              onThemeChange(t.id);
              toast(`Tema aktif: ${t.name}`, {
                id: 'theme-toast',
                icon: t.icon,
                duration: 1400,
              });
            }}
            title={`Ganti tema ke ${t.name}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: isActive ? '2.5px solid #000000' : '2px solid #000000',
              background: isActive ? t.primary : '#FFFFFF',
              color: isActive ? textColor : '#000000',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: isActive ? '3px 3px 0px #000000' : 'none',
              transform: isActive ? 'translate(-1px, -1px)' : 'none',
              transition: 'background 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.id.toUpperCase()}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function App() {
  // =========================================================
  // THEME (Default to brand purple)
  // =========================================================

  const [currentThemeId, setCurrentThemeId] = useState<QuizThemeId>('purple');
  const currentThemeConfig = QUIZ_THEMES[currentThemeId];

  // =========================================================
  // PLAYER
  // =========================================================

  const [playerName, setPlayerName] = useState<string>('');

  // =========================================================
  // QUIZ SETTINGS
  // =========================================================

  const [category, setCategory] = useState<QuizCategory>('general');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('easy');

  // =========================================================
  // QUESTIONS
  // =========================================================

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // =========================================================
  // QUIZ PROGRESS
  // =========================================================

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

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

    const loadToastId = toast.loading('Memuat soal kuis...', {
      id: 'quiz-loading',
    });

    try {
      const data = await fetchQuestions({
        amount: 10,
        category: selectedCategory,
        difficulty: selectedDifficulty,
      });

      setQuestions(data);
      toast.success(`Selamat datang, ${name}! Kuis siap dimulai 🎯`, {
        id: loadToastId,
        duration: 2200,
      });
    } catch (err) {
      console.error('Gagal mengambil soal:', err);

      setError('Gagal mengambil soal. Silakan coba lagi.');
      setPlayerName('');
      toast.error('Gagal mengambil soal. Silakan coba lagi.', {
        id: loadToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  const handleSelectAnswer = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));

    toast.success('Jawaban dipilih!', {
      id: 'answer-toast',
      icon: '✅',
      duration: 1200,
    });
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      toast(`Soal ${currentIndex + 2} dari ${questions.length}`, {
        id: 'nav-toast',
        icon: '📝',
        duration: 1000,
      });
    } else {
      setIsQuizFinished(true);
      toast.success('Semua soal terjawab! Menghitung hasil... 🎉', {
        id: 'finish-toast',
        duration: 2500,
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      toast(`Kembali ke soal ${currentIndex}`, {
        id: 'nav-toast',
        icon: '↩️',
        duration: 1000,
      });
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
    toast('Kuis direset. Ayo coba lagi!', {
      id: 'restart-toast',
      icon: '🔄',
      duration: 2000,
    });
  };

  // =========================================================
  // PAGE STYLE (DYNAMIC CANVAS THEME COLOR)
  // =========================================================

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: currentThemeConfig.canvasBg,
    backgroundImage: 'radial-gradient(#000000 1.25px, transparent 1.25px)',
    backgroundSize: '24px 24px',
    padding: '36px 16px 60px',
    color: '#000000',
    overflowX: 'hidden',
    transition: 'background-color 0.25s ease',
  };

  // =========================================================
  // NAME FORM SCREEN
  // =========================================================

  if (!playerName) {
    return (
      <div style={pageStyle}>
        <QuizToaster themeConfig={currentThemeConfig} />
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <NameForm
          onStartQuiz={handleStartQuiz}
          themeConfig={currentThemeConfig}
        />

        {error && (
          <div
            style={{
              maxWidth: '500px',
              margin: '20px auto 0',
              padding: '12px 18px',
              borderRadius: '12px',
              background: '#FEE2E2',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              color: '#B91C1C',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </div>
    );
  }

  // =========================================================
  // LOADING SCREEN
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
        <QuizToaster themeConfig={currentThemeConfig} />
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: 'min(460px, 92%)',
            padding: '36px 28px',
            borderRadius: '20px',
            background: currentThemeConfig.surface,
            border: '4px solid #000000',
            boxShadow: '10px 10px 0px #000000',
            color: '#000000',
            textAlign: 'center',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {/* Logo / Icon Badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              borderRadius: '14px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              marginBottom: '16px',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ fontSize: '38px' }}
            >
              🎯
            </motion.div>
          </div>

          <h2
            style={{
              margin: '0 0 6px',
              fontSize: '24px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            Menyiapkan Quiz...
          </h2>

          <p
            style={{
              margin: '0 0 20px',
              color: '#4B5563',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            Mengambil soal trivia dari OpenTDB API
          </p>

          {/* Neo-brutalist loading track */}
          <div
            style={{
              width: '100%',
              height: '16px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '50%',
                height: '100%',
                background: currentThemeConfig.primary,
                borderRight: '2px solid #000',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '16px',
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '6px',
              background: currentThemeConfig.highlight,
              border: '1.5px solid #000000',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#000000',
            }}
          >
            ⚡ Hampir Siap...
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // ERROR SCREEN
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
        <QuizToaster themeConfig={currentThemeConfig} />
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            maxWidth: '460px',
            width: '92%',
            padding: '36px 28px',
            borderRadius: '20px',
            background: '#FFFFFF',
            border: '4px solid #000000',
            boxShadow: '10px 10px 0px #000000',
            textAlign: 'center',
            color: '#000000',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>😵</div>

          <h2
            style={{
              margin: '0 0 8px',
              fontSize: '24px',
              fontWeight: 900,
              textTransform: 'uppercase',
            }}
          >
            Terjadi Kesalahan!
          </h2>

          <p
            style={{
              color: '#B91C1C',
              margin: '0 0 24px',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: 1.5,
              background: '#FEE2E2',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '2px solid #000000',
            }}
          >
            {error}
          </p>

          <motion.button
            type="button"
            whileHover={{ y: -2, boxShadow: '7px 7px 0px #000000' }}
            whileTap={{ y: 2, boxShadow: '2px 2px 0px #000000' }}
            onClick={handleRestart}
            style={{
              border: '3.5px solid #000000',
              borderRadius: '14px',
              padding: '14px 28px',
              background: currentThemeConfig.primary,
              color: currentThemeConfig.contrastText,
              fontSize: '15px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '5px 5px 0px #000000',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            🔄 COBA LAGI
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // RESULT SCREEN
  // =========================================================

  if (isQuizFinished) {
    return (
      <div style={pageStyle}>
        <QuizToaster themeConfig={currentThemeConfig} />
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
  // QUIZ SCREEN
  // =========================================================

  if (questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = userAnswers[currentIndex] || null;

    return (
      <div style={pageStyle}>
        <QuizToaster themeConfig={currentThemeConfig} />
        <ThemeSwitcher
          currentTheme={currentThemeId}
          onThemeChange={setCurrentThemeId}
        />

        {/* Player Greeting Badge */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            <span style={{ fontSize: '15px' }}>💪</span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#000000',
              }}
            >
              Semangat bertanding,{' '}
              <span
                style={{
                  color: currentThemeConfig.primary,
                  fontWeight: 900,
                  textDecoration: 'underline',
                }}
              >
                {playerName}
              </span>
              !
            </span>
          </motion.div>
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