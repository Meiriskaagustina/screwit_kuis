import { useEffect, useCallback } from 'react';
import type { Question, QuizThemeConfig } from '../api/quiz.types';
import { QUIZ_THEMES } from '../api/quiz.types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface ResultViewProps {
  playerName: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  timeTakenSeconds: number;

  category: string;
  difficulty: string;

  themeConfig?: QuizThemeConfig;
}

function formatDuration(totalSeconds: number): string {
  const total = Math.max(0, Math.round(totalSeconds));

  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  if (minutes <= 0) {
    return `${seconds} detik`;
  }

  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

function formatCategory(cat: string): string {
  switch (cat.toLowerCase()) {
    case 'general':
    case 'general knowledge':
      return 'General Knowledge';
    case 'animals':
      return 'Animals';
    default:
      return cat;
  }
}

function formatDifficulty(diff: string): string {
  switch (diff.toLowerCase()) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return diff;
  }
}

export function ResultView({
  playerName,
  questions,
  userAnswers,
  onRestart,
  timeTakenSeconds,
  category,
  difficulty,
  themeConfig = QUIZ_THEMES.purple,
}: ResultViewProps) {
  const correctCount = questions.reduce((count, question, index) => {
    return userAnswers[index] === question.correctAnswer ? count + 1 : count;
  }, 0);

  const scorePercentage =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  const avgSecondsPerQuestion =
    questions.length > 0 ? timeTakenSeconds / questions.length : 0;

  const isExcellent = scorePercentage >= 80;
  const isGood = scorePercentage >= 60;

  const resultConfig = isExcellent
    ? {
        emoji: '🏆',
        title: 'LUAR BIASA!',
        subtitle: 'Performa sangat mengagumkan! 🔥',
      }
    : isGood
      ? {
          emoji: '😎',
          title: 'HASIL BAGUS!',
          subtitle: 'Dikit lagi mencapai skor sempurna! 🚀',
        }
      : {
          emoji: '💪',
          title: 'TETAP SEMANGAT!',
          subtitle: 'Coba lagi untuk mengasah kemampuanmu! 😏',
        };

  const fireCelebration = useCallback(() => {
    const colors = [
      themeConfig.primary,
      themeConfig.secondary,
      themeConfig.accent,
      themeConfig.highlight,
      '#000000',
      '#FFFFFF',
    ];

    if (isExcellent) {
      const duration = 2400;
      const animationEnd = Date.now() + duration;

      const interval: number = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 45 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: 32,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random() * 0.4 + 0.1,
            y: Math.random() * 0.4 + 0.2,
          },
          colors,
          zIndex: 9999,
        });

        confetti({
          particleCount,
          startVelocity: 32,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random() * 0.4 + 0.5,
            y: Math.random() * 0.4 + 0.2,
          },
          colors,
          zIndex: 9999,
        });
      }, 300);
    } else if (isGood) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors,
        zIndex: 9999,
      });

      window.setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.5 },
          colors,
          zIndex: 9999,
        });
      }, 300);
    } else {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors,
        zIndex: 9999,
      });
    }
  }, [isExcellent, isGood, themeConfig]);

  useEffect(() => {
    fireCelebration();

    const toastMessage = isExcellent
      ? `Luar Biasa, ${playerName}! Skor: ${scorePercentage}% 🏆`
      : isGood
        ? `Hebat, ${playerName}! Skor: ${scorePercentage}% 🎉`
        : `Kuis selesai, ${playerName}! Tetap semangat 💪`;

    toast.success(toastMessage, {
      id: 'result-celebration-toast',
      icon: resultConfig.emoji,
      duration: 3500,
    });

    return () => {
      confetti.reset();
    };
  }, [
    fireCelebration,
    isExcellent,
    isGood,
    playerName,
    resultConfig.emoji,
    scorePercentage,
  ]);

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '760px',
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* FLOATING DECORATIVE BADGES (DESKTOP) */}
      <div
        className="neo-desktop-decor"
        style={{
          position: 'absolute',
          top: '-24px',
          left: '-44px',
          background: themeConfig.highlight,
          color: '#000000',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 900,
          transform: 'rotate(-6deg)',
          zIndex: 5,
          userSelect: 'none',
        }}
      >
        ★ GAME OVER ★
      </div>

      <div
        className="neo-desktop-decor"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '-46px',
          background: themeConfig.primary,
          color: themeConfig.contrastText,
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 900,
          transform: 'rotate(5deg)',
          zIndex: 5,
          userSelect: 'none',
        }}
      >
        ⚡ SCORE LOCKED ⚡
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: '24px',
          background: themeConfig.surface,
          border: '4px solid #000000',
          boxShadow: '12px 12px 0px #000000',
        }}
      >
        {/* TOP POSTER RIBBON */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: themeConfig.highlight,
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              color: '#000000',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            ★ OFFICIAL SCORE CARD ★
          </span>

          <span
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#000000',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            SCREWIT QUIZ RESULT
          </span>
        </div>

        {/* HERO HEADER */}
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 15 }}
            style={{
              fontSize: '60px',
              marginBottom: '8px',
              display: 'inline-block',
            }}
          >
            {resultConfig.emoji}
          </motion.div>

          <h1
            style={{
              margin: '0 0 6px',
              color: '#000000',
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            {resultConfig.title}
          </h1>

          <p
            style={{
              margin: 0,
              color: '#374151',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            {resultConfig.subtitle}
          </p>

          {/* PLAYER BADGE */}
          <div
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '6px 16px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 800,
            }}
          >
            Pemain:{' '}
            <span
              style={{
                color: themeConfig.primary,
                fontWeight: 900,
                textDecoration: 'underline',
              }}
            >
              {playerName}
            </span>
          </div>

          {/* CATEGORY & DIFFICULTY BADGES */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: themeConfig.primary,
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: themeConfig.contrastText,
                fontSize: '12px',
                fontWeight: 800,
              }}
            >
              📚 {formatCategory(category)}
            </div>

            <div
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 800,
              }}
            >
              {difficulty.toLowerCase() === 'easy'
                ? '🌱'
                : difficulty.toLowerCase() === 'medium'
                  ? '🔥'
                  : '⚡'}{' '}
              {formatDifficulty(difficulty)}
            </div>
          </div>

          {/* BIG THEMED SCORE CARD */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              fireCelebration();
              toast('🎉 Woohoo! Selebrasi lagi!', {
                id: 'celebrate-click-toast',
                duration: 1500,
                icon: '✨',
              });
            }}
            title="Klik untuk selebrasi confetti lagi!"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '175px',
              height: '175px',
              margin: '24px auto 16px',
              borderRadius: '24px',
              background: themeConfig.primary,
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px #000000',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontSize: '58px',
                lineHeight: 1,
                fontWeight: 900,
                color: themeConfig.contrastText,
                letterSpacing: '-0.04em',
              }}
            >
              {scorePercentage}
            </span>

            <span
              style={{
                marginTop: '6px',
                padding: '3px 10px',
                borderRadius: '6px',
                background: '#000000',
                color: themeConfig.highlight,
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.08em',
              }}
            >
              SKOR AKHIR
            </span>
          </motion.div>

          <p
            style={{
              color: '#374151',
              fontSize: '14px',
              fontWeight: 700,
              margin: '0 0 4px',
            }}
          >
            Kamu menjawab{' '}
            <strong
              style={{
                color: '#000000',
                background: themeConfig.highlight,
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1.5px solid #000',
              }}
            >
              {correctCount}
            </strong>{' '}
            dari{' '}
            <strong style={{ color: '#000000' }}>{questions.length}</strong>{' '}
            soal dengan benar
          </p>

          <div
            style={{
              fontSize: '11px',
              color: '#4B5563',
              fontWeight: 700,
            }}
          >
            💡 Klik kotak skor di atas untuk memicu kembang api lagi!
          </div>
        </div>

        {/* STATS DASHBOARD GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            marginTop: '28px',
          }}
        >
          {/* Card 1: Jumlah Soal */}
          <div
            style={{
              padding: '16px 10px',
              borderRadius: '14px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>📝</div>
            <div
              style={{
                color: '#000000',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              {questions.length}
            </div>
            <div
              style={{
                color: '#4B5563',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginTop: '2px',
              }}
            >
              TOTAL SOAL
            </div>
          </div>

          {/* Card 2: Total Waktu */}
          <div
            style={{
              padding: '16px 10px',
              borderRadius: '14px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>⏱️</div>
            <div
              style={{
                color: '#000000',
                fontSize: '18px',
                fontWeight: 900,
              }}
            >
              {formatDuration(timeTakenSeconds)}
            </div>
            <div
              style={{
                color: '#4B5563',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginTop: '2px',
              }}
            >
              TOTAL WAKTU
            </div>
          </div>

          {/* Card 3: Rata-Rata */}
          <div
            style={{
              padding: '16px 10px',
              borderRadius: '14px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>⚡</div>
            <div
              style={{
                color: '#000000',
                fontSize: '18px',
                fontWeight: 900,
              }}
            >
              {formatDuration(avgSecondsPerQuestion)}
            </div>
            <div
              style={{
                color: '#4B5563',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginTop: '2px',
              }}
            >
              RATA-RATA / SOAL
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            height: '4px',
            background: '#000000',
            margin: '32px 0 24px',
            borderRadius: '999px',
          }}
        />

        {/* EVALUATION LIST */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              margin: 0,
              color: '#000000',
              fontSize: '18px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'uppercase',
            }}
          >
            <span>📋</span> Evaluasi Jawaban
          </h3>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#4B5563',
            }}
          >
            {correctCount} Benar / {questions.length - correctCount} Salah
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04 }}
                style={{
                  padding: '16px 18px',
                  borderRadius: '16px',
                  background: isCorrect ? '#F0FDF4' : '#FEF2F2',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  {/* Status Indicator */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '2px solid #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isCorrect ? '#22C55E' : '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: 900,
                      boxShadow: '2px 2px 0px #000000',
                    }}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </div>

                  {/* Question details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: '#000000',
                          color: '#FFFFFF',
                        }}
                      >
                        SOAL {index + 1}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: isCorrect ? '#22C55E' : '#EF4444',
                          color: '#FFFFFF',
                        }}
                      >
                        {isCorrect ? 'BENAR' : 'SALAH'}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: '4px 0 10px',
                        color: '#000000',
                        fontSize: '14px',
                        lineHeight: 1.4,
                        fontWeight: 800,
                      }}
                    >
                      {q.question}
                    </p>

                    {/* Answers badge container */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                      }}
                    >
                      <div
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: '#FFFFFF',
                          border: '1.5px solid #000000',
                          color: isCorrect ? '#15803D' : '#B91C1C',
                        }}
                      >
                        Jawabanmu:{' '}
                        <strong>{userAnswer || 'Tidak dijawab'}</strong>
                      </div>

                      {!isCorrect && (
                        <div
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: '#DCFCE7',
                            border: '1.5px solid #000000',
                            color: '#15803D',
                          }}
                        >
                          ✓ Kunci Jawaban: <strong>{q.correctAnswer}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RESTART BUTTON (THEMED PRIMARY) */}
        <motion.button
          type="button"
          whileHover={{ y: -3, boxShadow: '8px 8px 0px #000000' }}
          whileTap={{ y: 2, boxShadow: '2px 2px 0px #000000' }}
          onClick={onRestart}
          style={{
            width: '100%',
            marginTop: '32px',
            padding: '16px 20px',
            border: '3.5px solid #000000',
            borderRadius: '14px',
            background: themeConfig.primary,
            color: themeConfig.contrastText,
            fontSize: '16px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '6px 6px 0px #000000',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            transition: 'all 0.15s ease',
          }}
        >
          🔄 MAIN LAGI DENGAN NAMA BARU
        </motion.button>
      </motion.div>
    </div>
  );
}