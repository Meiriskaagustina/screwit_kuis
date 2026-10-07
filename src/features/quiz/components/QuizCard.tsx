import { useEffect, useRef, useState } from 'react';
import type { Question, QuizThemeConfig } from '../api/quiz.types';
import { QUIZ_THEMES } from '../api/quiz.types';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onTick?: (elapsedSeconds: number) => void;
  themeConfig?: QuizThemeConfig;
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function formatDifficulty(difficulty: string): string {
  if (difficulty === 'easy') return 'Easy';
  if (difficulty === 'medium') return 'Medium';
  if (difficulty === 'hard') return 'Hard';

  return difficulty;
}

function getDifficultyIcon(difficulty: string): string {
  if (difficulty === 'easy') return '🌱';
  if (difficulty === 'medium') return '🔥';
  if (difficulty === 'hard') return '💀';

  return '⭐';
}

export function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onTick,
  themeConfig = QUIZ_THEMES.purple,
}: QuizCardProps) {
  const progressPercentage =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (startTimeRef.current === null) {
        return;
      }

      const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);

      setElapsedSeconds(seconds);
      onTick?.(seconds);
    }, 1000);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '740px',
        width: '100%',
        margin: '18px auto 0',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* FLOATING DECORATIVE BADGES (DESKTOP) */}
      <div
        className="neo-desktop-decor"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-40px',
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
        🎯 FOKUS & JAWAB
      </div>

      <div
        className="neo-desktop-decor"
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '-44px',
          background: themeConfig.secondary,
          color: '#FFFFFF',
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
        ⚡ TRIVIA ROUND
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          padding: 'clamp(22px, 5vw, 36px)',
          borderRadius: '22px',
          background: themeConfig.surface,
          border: '4px solid #000000',
          boxShadow: '10px 10px 0px #000000',
        }}
      >
        {/* TOP META BADGES */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Question Number Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
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
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#000000',
                }}
              />
              SOAL {currentIndex + 1} / {totalQuestions}
            </span>

            {/* Category Badge */}
            <span
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                background: themeConfig.primary,
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: themeConfig.contrastText,
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              🧠 {question.category}
            </span>

            {/* Difficulty Badge */}
            <span
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#000000',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              {getDifficultyIcon(question.difficulty)}{' '}
              {formatDifficulty(question.difficulty)}
            </span>
          </div>

          {/* TIMER BADGE */}
          <div
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              color: '#000000',
              fontSize: '12px',
              fontWeight: 900,
              fontVariantNumeric: 'tabular-nums',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>⏱️</span>
            <span>{formatClock(elapsedSeconds)}</span>
          </div>
        </div>

        {/* PROGRESS TRACK */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                color: '#000000',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.06em',
              }}
            >
              PROGRESS:
            </span>

            <span
              style={{
                background: '#000000',
                color: themeConfig.highlight,
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 900,
              }}
            >
              {Math.round(progressPercentage)}%
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '14px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '2px 2px 0px #000000',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: themeConfig.primary,
                borderRight: progressPercentage > 0 ? '2px solid #000000' : 'none',
              }}
            />
          </div>
        </div>

        {/* QUESTION CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id || currentIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#000000',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              PERTANYAAN
            </div>

            <h2
              style={{
                margin: '0 0 24px',
                color: '#000000',
                fontSize: 'clamp(20px, 4.5vw, 25px)',
                fontWeight: 900,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
              }}
            >
              {question.question}
            </h2>

            {/* ANSWERS LIST */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {question.answers.map((answer, index) => {
                const isSelected = selectedAnswer === answer;

                return (
                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2 }}
                    onClick={() => onSelectAnswer(answer)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 16px',
                      textAlign: 'left',
                      borderRadius: '14px',
                      border: '3px solid #000000',
                      background: isSelected ? themeConfig.primary : '#FFFFFF',
                      color: isSelected ? themeConfig.contrastText : '#000000',
                      cursor: 'pointer',
                      boxShadow: isSelected
                        ? '6px 6px 0px #000000'
                        : '4px 4px 0px #000000',
                      transform: isSelected
                        ? 'translate(-2px, -2px)'
                        : 'translate(0px, 0px)',
                      transition:
                        'background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                    }}
                  >
                    {/* Label Box (A, B, C, D) */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        border: '2.5px solid #000000',
                        background: isSelected ? themeConfig.highlight : '#FFFDF0',
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 900,
                        boxShadow: '2px 2px 0px #000000',
                      }}
                    >
                      {labels[index] ?? index + 1}
                    </span>

                    {/* Answer Text */}
                    <span
                      style={{
                        flex: 1,
                        fontSize: '15px',
                        lineHeight: 1.4,
                        fontWeight: isSelected ? 800 : 700,
                        color: isSelected ? themeConfig.contrastText : '#000000',
                      }}
                    >
                      {answer}
                    </span>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: themeConfig.highlight,
                          color: '#000000',
                          border: '2px solid #000000',
                          fontSize: '12px',
                          fontWeight: 900,
                          boxShadow: '2px 2px 0px #000000',
                        }}
                      >
                        ✓ DIPILIH
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION BUTTONS */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginTop: '28px',
          }}
        >
          {/* BACK BUTTON */}
          <motion.button
            type="button"
            whileHover={currentIndex > 0 ? { y: -2 } : {}}
            whileTap={currentIndex > 0 ? { y: 2 } : {}}
            onClick={onPreviousQuestion}
            disabled={currentIndex === 0}
            style={{
              minWidth: '110px',
              padding: '13px 18px',
              border:
                currentIndex > 0 ? '3px solid #000000' : '2.5px solid #9CA3AF',
              borderRadius: '12px',
              background: currentIndex > 0 ? '#FFFFFF' : '#E5E7EB',
              color: currentIndex > 0 ? '#000000' : '#9CA3AF',
              fontSize: '13px',
              fontWeight: 800,
              cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
              boxShadow: currentIndex > 0 ? '4px 4px 0px #000000' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            ← KEMBALI
          </motion.button>

          {/* NEXT / FINISH BUTTON (USES ACTIVE THEME PRIMARY) */}
          <motion.button
            type="button"
            whileHover={
              selectedAnswer
                ? { y: -2, boxShadow: '7px 7px 0px #000000' }
                : {}
            }
            whileTap={
              selectedAnswer ? { y: 2, boxShadow: '2px 2px 0px #000000' } : {}
            }
            onClick={onNextQuestion}
            disabled={!selectedAnswer}
            style={{
              minWidth: '135px',
              padding: '14px 24px',
              border: selectedAnswer
                ? '3.5px solid #000000'
                : '2.5px solid #9CA3AF',
              borderRadius: '12px',
              background: selectedAnswer ? themeConfig.primary : '#E5E7EB',
              color: selectedAnswer ? themeConfig.contrastText : '#9CA3AF',
              fontSize: '14px',
              fontWeight: 900,
              cursor: selectedAnswer ? 'pointer' : 'not-allowed',
              boxShadow: selectedAnswer ? '5px 5px 0px #000000' : 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'all 0.15s ease',
            }}
          >
            {currentIndex === totalQuestions - 1 ? 'SELESAI ✓' : 'LANJUT →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}