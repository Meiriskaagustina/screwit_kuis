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
  themeConfig = QUIZ_THEMES.blue,
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
        maxWidth: '680px',
        width: '100%',
        boxSizing: 'border-box',
        margin: '28px auto 0',
        padding: 'clamp(24px, 5vw, 36px)',
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
          "'Inter', system-ui, -apple-system, sans-serif",

        overflow: 'hidden',
      }}
    >
      {/* GLOW - Dynamic Theme */}

      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background:
            `radial-gradient(circle, ${themeConfig.glow1}, transparent 70%)`,
          top: '-100px',
          right: '-80px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background:
            `radial-gradient(circle, ${themeConfig.glow2}, transparent 70%)`,
          bottom: '-90px',
          left: '-80px',
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
            marginBottom: '16px',
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
            {/* Question number */}

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',

                padding: '6px 12px',
                borderRadius: '999px',

                background:
                  'rgba(255,255,255,0.08)',

                border:
                  '1px solid rgba(255,255,255,0.14)',

                color:
                  'rgba(255,255,255,0.85)',

                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background:
                    themeConfig.primary,
                  boxShadow:
                    `0 0 8px ${themeConfig.primary}`,
                }}
              />

              SOAL {currentIndex + 1}/
              {totalQuestions}
            </span>

            {/* Category */}

            <span
              style={{
                padding: '6px 12px',
                borderRadius: '999px',

                background:
                  themeConfig.selectedBg,

                border:
                  `1px solid ${themeConfig.selectedBorder}`,

                color:
                  themeConfig.accent,

                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              🧠 {question.category}
            </span>

            {/* Difficulty */}

            <span
              style={{
                padding: '6px 12px',
                borderRadius: '999px',

                background:
                  'rgba(255,255,255,0.08)',

                border:
                  '1px solid rgba(255,255,255,0.14)',

                color: '#b9d9dc',

                fontSize: '11px',
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
              padding: '6px 12px',
              borderRadius: '999px',

              background:
                'rgba(255,255,255,0.08)',

              border:
                '1px solid rgba(255,255,255,0.14)',

              color:
                'rgba(255,255,255,0.85)',

              fontSize: '11px',
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
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              color:
                themeConfig.accent,
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            PROGRESS
          </span>

          <span
            style={{
              color: '#fde68a',
              fontSize: '11px',
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
              duration: 0.5,
              ease: 'easeOut',
            }}
            style={{
              height: '100%',
              borderRadius: '999px',

              background:
                themeConfig.gradient,

              boxShadow:
                `0 0 12px ${themeConfig.glow1}`,
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
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  color: themeConfig.accent,
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                }}
              >
                PERTANYAAN
              </span>
            </div>

            <h3
              style={{
                margin:
                  '0 0 28px',

                color: '#ffffff',

                fontSize:
                  'clamp(19px, 4.5vw, 24px)',

                fontWeight: 800,

                lineHeight: 1.45,

                letterSpacing:
                  '-0.02em',
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
                gap: '12px',
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
                        scale: 1.012,
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
                        gap: '14px',

                        width: '100%',
                        boxSizing:
                          'border-box',

                        padding:
                          '15px 18px',

                        textAlign:
                          'left',

                        borderRadius:
                          '18px',

                        border:
                          isSelected
                            ? `1.5px solid ${themeConfig.selectedBorder}`
                            : '1px solid rgba(255,255,255,0.14)',

                        background:
                          isSelected
                            ? themeConfig.selectedBg
                            : 'rgba(255,255,255,0.075)',

                        color:
                          '#ffffff',

                        cursor:
                          'pointer',

                        outline:
                          'none',

                        boxShadow:
                          isSelected
                            ? themeConfig.selectedShadow
                            : 'none',

                        transition:
                          'border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
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

                          width: '36px',
                          height: '36px',

                          borderRadius:
                            '12px',

                          background:
                            isSelected
                              ? themeConfig.gradient
                              : 'rgba(255,255,255,0.10)',

                          color:
                            '#ffffff',

                          fontSize:
                            '13px',

                          fontWeight:
                            900,

                          boxShadow:
                            isSelected
                              ? `0 4px 12px ${themeConfig.glow1}`
                              : 'none',
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
                            '14.5px',

                          lineHeight:
                            1.45,

                          fontWeight:
                            isSelected
                              ? 700
                              : 500,

                          color:
                            isSelected
                              ? '#ffffff'
                              : 'rgba(255,255,255,0.9)',
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

                            width: '24px',
                            height: '24px',

                            borderRadius:
                              '50%',

                            background:
                              themeConfig.gradient,
                            color:
                              '#ffffff',

                            fontSize:
                              '12px',

                            fontWeight:
                              900,

                            boxShadow:
                              `0 2px 8px ${themeConfig.glow1}`,
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
            gap: '14px',
            marginTop: '32px',
          }}
        >
          {/* BACK */}
          <motion.button
            type="button"
            whileHover={
              currentIndex > 0
                ? {
                    scale: 1.02,
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
              padding: '13px 20px',

              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '16px',

              background:
                currentIndex > 0
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.03)',

              color:
                currentIndex > 0
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(255,255,255,0.25)',

              fontSize: '13px',
              fontWeight: 700,

              cursor:
                currentIndex > 0
                  ? 'pointer'
                  : 'not-allowed',

              opacity:
                currentIndex > 0
                  ? 1
                  : 0.5,

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
                    scale: 1.02,
                    y: -2,
                    boxShadow: `0 12px 28px ${themeConfig.glow1}`,
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
              minWidth: '135px',
              padding: '14px 24px',

              border: 'none',
              borderRadius: '16px',

              background: selectedAnswer
                ? themeConfig.gradient
                : 'rgba(255,255,255,0.08)',

              color: '#ffffff',

              fontSize: '14px',
              fontWeight: 900,

              cursor: selectedAnswer
                ? 'pointer'
                : 'not-allowed',

              opacity: selectedAnswer
                ? 1
                : 0.45,

              boxShadow: selectedAnswer
                ? `0 10px 25px ${themeConfig.glow1}`
                : 'none',

              transition: 'all 0.2s ease',
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
