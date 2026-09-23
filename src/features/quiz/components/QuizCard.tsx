import { useEffect, useRef, useState } from 'react';
import type { Question } from '../api/quiz.types';
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
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function formatDifficulty(
  difficulty: string,
): string {
  if (difficulty === 'easy') return 'Easy';
  if (difficulty === 'medium') return 'Medium';
  if (difficulty === 'hard') return 'Hard';

  return difficulty;
}

function getDifficultyIcon(
  difficulty: string,
): string {
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
}: QuizCardProps) {
  const progressPercentage =
    totalQuestions > 0
      ? ((currentIndex + 1) / totalQuestions) * 100
      : 0;

  const startTimeRef =
    useRef<number>(Date.now());

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  useEffect(() => {
    const intervalId =
      window.setInterval(() => {
        const seconds = Math.floor(
          (Date.now() -
            startTimeRef.current) /
            1000,
        );

        setElapsedSeconds(seconds);
        onTick?.(seconds);
      }, 1000);

    return () =>
      window.clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      style={{
        position: 'relative',
        maxWidth: '640px',
        width: '100%',
        boxSizing: 'border-box',
        margin: '28px auto 0',
        padding: 'clamp(22px, 5vw, 34px)',
        borderRadius: '30px',

        background:
          'linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))',

        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',

        border:
          '1px solid rgba(255,255,255,0.20)',

        boxShadow:
          '0 30px 70px rgba(17,24,39,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',

        fontFamily:
          "'Inter', system-ui, sans-serif",

        overflow: 'hidden',
      }}
    >
      {/* GLOW */}

      <div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%)',
          top: '-90px',
          right: '-70px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.20), transparent 70%)',
          bottom: '-80px',
          left: '-70px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* TOP INFO */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '14px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '7px',
              flexWrap: 'wrap',
            }}
          >
            {/* Question number */}

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',

                padding: '7px 10px',
                borderRadius: '999px',

                background:
                  'rgba(255,255,255,0.09)',

                border:
                  '1px solid rgba(255,255,255,0.12)',

                color:
                  'rgba(255,255,255,0.72)',

                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #fbbf24, #fb7185)',
                  boxShadow:
                    '0 0 10px rgba(251,191,36,0.7)',
                }}
              />

              SOAL {currentIndex + 1}/
              {totalQuestions}
            </span>

            {/* Category */}

            <span
              style={{
                padding: '7px 10px',
                borderRadius: '999px',

                background:
                  'rgba(255,255,255,0.09)',

                border:
                  '1px solid rgba(255,255,255,0.12)',

                color:
                  'rgba(255,255,255,0.72)',

                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              🧠 {question.category}
            </span>

            {/* Difficulty */}

            <span
              style={{
                padding: '7px 10px',
                borderRadius: '999px',

                background:
  'rgba(111,163,168,0.16)',

border:
  '1px solid rgba(111,163,168,0.28)',

color: '#b9d9dc',

                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              {getDifficultyIcon(
                question.difficulty,
              )}{' '}
              {formatDifficulty(
                question.difficulty,
              )}
            </span>
          </div>

          {/* TIMER */}

          <div
            style={{
              padding: '7px 10px',
              borderRadius: '999px',

              background:
                'rgba(255,255,255,0.09)',

              border:
                '1px solid rgba(255,255,255,0.12)',

              color:
                'rgba(255,255,255,0.75)',

              fontSize: '10px',
              fontWeight: 700,

              fontVariantNumeric:
                'tabular-nums',
            }}
          >
            ⏱️ {formatClock(elapsedSeconds)}
          </div>
        </div>

        {/* PROGRESS */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              color:
                'rgba(255,255,255,0.40)',
              fontSize: '9px',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            PROGRESS
          </span>

          <span
            style={{
              color: '#fde68a',
              fontSize: '10px',
              fontWeight: 800,
            }}
          >
            {Math.round(
              progressPercentage,
            )}
            %
          </span>
        </div>

        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '999px',

            background:
              'rgba(255,255,255,0.10)',

            overflow: 'hidden',

            marginBottom: '28px',
          }}
        >
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progressPercentage}%`,
            }}
            transition={{
              duration: 0.6,
            }}
            style={{
              height: '100%',
              borderRadius: '999px',

              background:
  'linear-gradient(90deg, #5B8DEF, #6FA3A8)',

boxShadow:
  '0 0 12px rgba(91,141,239,0.25)',
            }}
          />
        </div>

        {/* QUESTION */}

        <AnimatePresence
          mode="wait"
        >
          <motion.div
            key={
              question.id ||
              currentIndex
            }
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                marginBottom: '10px',
              }}
            >
              <span>
                🧠
              </span>

              <span
                style={{
color: '#9fc4e8',                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                }}
              >
                QUESTION
              </span>
            </div>

            <h3
              style={{
                margin:
                  '0 0 26px',

                color: '#ffffff',

                fontSize:
                  'clamp(19px, 4.5vw, 25px)',

                fontWeight: 800,

                lineHeight: 1.4,

                letterSpacing:
                  '-0.025em',
              }}
            >
              {question.question}
            </h3>

            {/* ANSWERS */}

            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column',
                gap: '11px',
              }}
            >
              {question.answers.map(
                (answer, index) => {
                  const isSelected =
                    selectedAnswer ===
                    answer;

                  return (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{
                        scale: 1.015,
                        x: 4,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      onClick={() =>
                        onSelectAnswer(
                          answer,
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '13px',

                        width: '100%',
                        boxSizing:
                          'border-box',

                        padding:
                          '14px 16px',

                        textAlign:
                          'left',

                        borderRadius:
                          '18px',

                        border:
  isSelected
    ? '1.5px solid rgba(91,141,239,0.75)'
    : '1px solid rgba(255,255,255,0.14)',

background:
  isSelected
    ? 'rgba(91,141,239,0.18)'
    : 'rgba(255,255,255,0.075)',

                        color:
                          '#ffffff',

                        cursor:
                          'pointer',

                        outline:
                          'none',

                        boxShadow:
  isSelected
    ? '0 10px 25px rgba(91,141,239,0.18)'
    : 'none',
                      }}
                    >
                      <span
                        style={{
                          display:
                            'inline-flex',

                          alignItems:
                            'center',

                          justifyContent:
                            'center',

                          flexShrink: 0,

                          width: '34px',
                          height: '34px',

                          borderRadius:
                            '11px',

                          background:
                            isSelected
    ? 'linear-gradient(135deg, #5B8DEF, #6FA3A8)'
                              : 'rgba(255,255,255,0.10)',

                          color:
                            '#ffffff',

                          fontSize:
                            '12px',

                          fontWeight:
                            900,
                        }}
                      >
                        {labels[
                          index
                        ] ??
                          index + 1}
                      </span>

                      <span
                        style={{
                          flex: 1,

                          fontSize:
                            '14px',

                          lineHeight:
                            1.45,

                          fontWeight:
                            isSelected
                              ? 700
                              : 500,
                        }}
                      >
                        {answer}
                      </span>

                      {isSelected && (
                        <span
                          style={{
                            display:
                              'flex',

                            alignItems:
                              'center',

                            justifyContent:
                              'center',

                            width: '22px',
                            height: '22px',

                            borderRadius:
                              '50%',

                            background:
  'linear-gradient(135deg, #5B8DEF, #6FA3A8)',
                            color:
                              '#ffffff',

                            fontSize:
                              '12px',

                            fontWeight:
                              900,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </motion.button>
                  );
                },
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}

<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginTop: '28px',
  }}
>
  {/* BACK */}
  <motion.button
    type="button"
    whileHover={
      currentIndex > 0
        ? {
            scale: 1.03,
            x: -2,
          }
        : {}
    }
    whileTap={
      currentIndex > 0
        ? {
            scale: 0.97,
          }
        : {}
    }
    onClick={onPreviousQuestion}
    disabled={currentIndex === 0}
    style={{
      minWidth: '110px',
      padding: '13px 18px',

      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: '15px',

      background:
        currentIndex > 0
          ? 'rgba(255,255,255,0.09)'
          : 'rgba(255,255,255,0.04)',

      color:
        currentIndex > 0
          ? 'rgba(255,255,255,0.85)'
          : 'rgba(255,255,255,0.30)',

      fontSize: '13px',
      fontWeight: 700,

      cursor:
        currentIndex > 0
          ? 'pointer'
          : 'not-allowed',

      opacity:
        currentIndex > 0
          ? 1
          : 0.6,

      transition: 'all 0.2s ease',
    }}
  >
    ← Kembali
  </motion.button>

  {/* NEXT */}
  <motion.button
    type="button"
    whileHover={
      selectedAnswer
        ? {
            scale: 1.03,
            y: -2,
          }
        : {}
    }
    whileTap={
      selectedAnswer
        ? {
            scale: 0.97,
          }
        : {}
    }
    onClick={onNextQuestion}
    disabled={!selectedAnswer}
    style={{
      minWidth: '130px',
      padding: '14px 22px',

      border: 'none',
      borderRadius: '15px',

      background: selectedAnswer
        ? 'linear-gradient(135deg, #5b8def, #6fa3a8)'
        : 'rgba(255,255,255,0.08)',

      color: '#ffffff',

      fontSize: '14px',
      fontWeight: 800,

      cursor: selectedAnswer
        ? 'pointer'
        : 'not-allowed',

      opacity: selectedAnswer
        ? 1
        : 0.5,

      boxShadow: selectedAnswer
        ? '0 8px 22px rgba(91,141,239,0.22)'
        : 'none',
    }}
  >
    {currentIndex === totalQuestions - 1
      ? 'Selesai ✓'
      : 'Lanjut →'}
  </motion.button>
</div>
          
      </div>
    </motion.div>
  );
}