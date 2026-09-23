import type { Question, QuizThemeConfig } from '../api/quiz.types';
import { QUIZ_THEMES } from '../api/quiz.types';
import { motion } from 'framer-motion';

interface ResultViewProps {
  playerName: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  timeTakenSeconds: number;

  // Info quiz
  category: string;
  difficulty: string;

  themeConfig?: QuizThemeConfig;
}


function formatDuration(totalSeconds: number): string {
  const total = Math.max(0, Math.round(totalSeconds));

  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  if (minutes <= 0) {
    return `${seconds}d`;
  }

  return `${minutes}m ${seconds.toString().padStart(2, '0')}d`;
}

function formatCategory(category: string): string {
  switch (category.toLowerCase()) {
    case 'general':
    case 'general knowledge':
      return 'General Knowledge';

    case 'animals':
      return 'Animals';

    default:
      return category;
  }
}

function formatDifficulty(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'Easy';

    case 'medium':
      return 'Medium';

    case 'hard':
      return 'Hard';

    default:
      return difficulty;
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
  themeConfig = QUIZ_THEMES.blue,
}: ResultViewProps) {
  const correctCount = questions.reduce((count, question, index) => {
    return userAnswers[index] === question.correctAnswer
      ? count + 1
      : count;
  }, 0);

  const scorePercentage =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  const avgSecondsPerQuestion =
    questions.length > 0
      ? timeTakenSeconds / questions.length
      : 0;

  const isExcellent = scorePercentage >= 80;
  const isGood = scorePercentage >= 60;

  const resultConfig = isExcellent
    ? {
        emoji: '🏆',
        title: 'Luar Biasa!',
        subtitle: 'Performa sangat mengagumkan 🔥',
      }
    : isGood
      ? {
          emoji: '😎',
          title: 'Hasil Bagus!',
          subtitle: 'Dikit lagi mencapai skor sempurna 🚀',
        }
      : {
          emoji: '💪',
          title: 'Tetap Semangat!',
          subtitle: 'Coba lagi untuk mengasah kemampuanmu 😏',
        };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '30px 18px 50px',
        boxSizing: 'border-box',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
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
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: 'clamp(26px, 5vw, 40px)',

          borderRadius: '32px',

          background:
            'linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))',

          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',

          border: '1px solid rgba(255,255,255,0.20)',

          boxShadow:
            '0 30px 70px rgba(17,24,39,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',

          overflow: 'hidden',
        }}
      >
        {/* Ambient Calm Glows */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background:
              `radial-gradient(circle, ${themeConfig.glow1}, transparent 70%)`,
            top: '-110px',
            right: '-90px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background:
              `radial-gradient(circle, ${themeConfig.glow2}, transparent 70%)`,
            bottom: '-100px',
            left: '-80px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* ================================================= */}
          {/* HERO */}
          {/* ================================================= */}

          <div style={{ textAlign: 'center' }}>
            <motion.div
              initial={{
                scale: 0,
                rotate: -20,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 15,
                delay: 0.15,
              }}
              style={{
                fontSize: '60px',
                marginBottom: '12px',
                display: 'inline-block',
              }}
            >
              {resultConfig.emoji}
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',

                  color: themeConfig.accent,

                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                QUIZ SELESAI!
              </div>

              <h1
                style={{
                  margin: 0,

                  fontSize: 'clamp(32px, 7vw, 46px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,

                  color: '#ffffff',
                }}
              >
                {resultConfig.title}
              </h1>

              <p
                style={{
                  margin: '10px 0 0',

                  color: 'rgba(255,255,255,0.70)',

                  fontSize: '14.5px',
                }}
              >
                {resultConfig.subtitle}
              </p>

              <p
                style={{
                  margin: '6px 0 0',

                  color: 'rgba(255,255,255,0.50)',

                  fontSize: '13px',
                }}
              >
                Hasil kuis untuk{' '}
                <strong
                  style={{
                    color: '#ffffff',
                  }}
                >
                  {playerName}
                </strong>
              </p>
            </motion.div>

            {/* ================================================= */}
            {/* CATEGORY & DIFFICULTY */}
            {/* ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',

                gap: '10px',
                marginTop: '22px',
              }}
            >
              {/* CATEGORY */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',

                  padding: '8px 16px',

                  borderRadius: '999px',

                  background: themeConfig.selectedBg,

                  border: `1px solid ${themeConfig.selectedBorder}`,

                  color: themeConfig.accent,

                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    fontSize: '15px',
                  }}
                >
                  📚
                </span>

                <span>
                  {formatCategory(category)}
                </span>
              </div>

              {/* DIFFICULTY */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',

                  padding: '8px 16px',

                  borderRadius: '999px',

                  background: 'rgba(255,255,255,0.08)',

                  border: '1px solid rgba(255,255,255,0.14)',

                  color: '#b9d9dc',

                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    fontSize: '15px',
                  }}
                >
                  {difficulty.toLowerCase() === 'easy'
                    ? '🌱'
                    : difficulty.toLowerCase() === 'medium'
                      ? '🔥'
                      : '⚡'}
                </span>

                <span>
                  {formatDifficulty(difficulty)}
                </span>
              </div>
            </motion.div>

            {/* ================================================= */}
            {/* SCORE CIRCLE */}
            {/* ================================================= */}

            <motion.div
              initial={{
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.35,
                type: 'spring',
                stiffness: 180,
                damping: 16,
              }}
              style={{
                width: '155px',
                height: '155px',

                margin: '28px auto 20px',

                borderRadius: '50%',
                padding: '7px',
                boxSizing: 'border-box',

                background:
                  `conic-gradient(${themeConfig.primary}, ${themeConfig.secondary}, ${themeConfig.primary})`,

                boxShadow:
                  `0 0 35px ${themeConfig.glow1}, 0 15px 35px rgba(0,0,0,0.20)`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',

                  borderRadius: '50%',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',

                  background:
                    'linear-gradient(145deg, rgba(23,32,51,0.96), rgba(29,41,57,0.96))',
                }}
              >
                <span
                  style={{
                    fontSize: '44px',
                    lineHeight: 1,

                    fontWeight: 900,

                    color: '#ffffff',

                    letterSpacing: '-0.04em',
                  }}
                >
                  {scorePercentage}
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,

                    color: themeConfig.accent,

                    marginTop: '4px',
                    letterSpacing: '0.1em',
                  }}
                >
                  SCORE
                </span>
              </div>
            </motion.div>

            <p
              style={{
                color: 'rgba(255,255,255,0.78)',

                fontSize: '13.5px',

                margin: 0,
              }}
            >
              Kamu menjawab{' '}
              <strong
                style={{
                  color: themeConfig.accent,
                }}
              >
                {correctCount}
              </strong>{' '}
              dari{' '}
              <strong
                style={{
                  color: '#ffffff',
                }}
              >
                {questions.length}
              </strong>{' '}
              soal dengan benar
            </p>
          </div>

          {/* ================================================= */}
          {/* STATS DASHBOARD GRID */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
            }}
            style={{
              display: 'grid',

              gridTemplateColumns:
                'repeat(3, minmax(0, 1fr))',

              gap: '12px',

              marginTop: '28px',
            }}
          >
            {/* JUMLAH SOAL */}

            <div
              style={{
                padding: '16px 12px',

                borderRadius: '20px',

                background: 'rgba(255,255,255,0.075)',

                border:
                  '1px solid rgba(255,255,255,0.14)',

                textAlign: 'center',

                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  marginBottom: '6px',
                }}
              >
                📝
              </div>

              <div
                style={{
                  color: '#ffffff',

                  fontSize: '18px',
                  fontWeight: 900,
                }}
              >
                {questions.length}
              </div>

              <div
                style={{
                  color: themeConfig.accent,

                  fontSize: '10px',
                  fontWeight: 800,

                  marginTop: '4px',
                  letterSpacing: '0.06em',
                }}
              >
                SOAL
              </div>
            </div>

            {/* TOTAL WAKTU */}

            <div
              style={{
                padding: '16px 12px',

                borderRadius: '20px',

                background: 'rgba(255,255,255,0.075)',

                border:
                  '1px solid rgba(255,255,255,0.14)',

                textAlign: 'center',

                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  marginBottom: '6px',
                }}
              >
                ⏱️
              </div>

              <div
                style={{
                  color: '#ffffff',

                  fontSize: '18px',
                  fontWeight: 900,
                }}
              >
                {formatDuration(timeTakenSeconds)}
              </div>

              <div
                style={{
                  color: themeConfig.accent,

                  fontSize: '10px',
                  fontWeight: 800,

                  marginTop: '4px',
                  letterSpacing: '0.06em',
                }}
              >
                TOTAL WAKTU
              </div>
            </div>

            {/* RATA-RATA */}

            <div
              style={{
                padding: '16px 12px',

                borderRadius: '20px',

                background: 'rgba(255,255,255,0.075)',

                border:
                  '1px solid rgba(255,255,255,0.14)',

                textAlign: 'center',

                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  marginBottom: '6px',
                }}
              >
                ⚡
              </div>

              <div
                style={{
                  color: '#ffffff',

                  fontSize: '18px',
                  fontWeight: 900,
                }}
              >
                {formatDuration(avgSecondsPerQuestion)}
              </div>

              <div
                style={{
                  color: themeConfig.accent,

                  fontSize: '10px',
                  fontWeight: 800,

                  marginTop: '4px',
                  letterSpacing: '0.06em',
                }}
              >
                RATA-RATA
              </div>
            </div>
          </motion.div>


          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div
            style={{
              height: '1px',

              margin: '32px 0 26px',

              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            }}
          />

          {/* ================================================= */}
          {/* EVALUATION SECTION */}
          {/* ================================================= */}

          <h3
            style={{
              margin: '0 0 16px',

              color: '#ffffff',

              fontSize: '18px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            📋 Evaluasi Jawaban
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',

              gap: '12px',
            }}
          >
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];

              const isCorrect =
                userAnswer === q.correctAnswer;

              return (
                <motion.div
                  key={q.id}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.5 + index * 0.05,
                    duration: 0.3,
                  }}
                  style={{
                    padding: '16px 18px',

                    borderRadius: '20px',

                    background: isCorrect
                      ? 'rgba(46, 125, 90, 0.12)'
                      : 'rgba(200, 60, 70, 0.12)',

                    border: isCorrect
                      ? '1px solid rgba(46, 125, 90, 0.30)'
                      : '1px solid rgba(200, 60, 70, 0.30)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',

                      gap: '12px',
                    }}
                  >
                    {/* STATUS ICON */}

                    <div
                      style={{
                        flexShrink: 0,

                        width: '30px',
                        height: '30px',

                        borderRadius: '10px',

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        background: isCorrect
                          ? 'rgba(46, 125, 90, 0.25)'
                          : 'rgba(200, 60, 70, 0.25)',

                        color: isCorrect
                          ? '#7ce3b6'
                          : '#f89898',

                        fontSize: '14px',
                        fontWeight: 900,
                      }}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </div>

                    {/* CONTENT */}

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <p
                        style={{
                          margin: '2px 0 8px',

                          color: '#ffffff',

                          fontSize: '13.5px',
                          lineHeight: 1.45,

                          fontWeight: 700,
                        }}
                      >
                        {index + 1}. {q.question}
                      </p>

                      <div
                        style={{
                          fontSize: '12.5px',

                          color: isCorrect
                            ? '#7ce3b6'
                            : '#f89898',

                          fontWeight: 600,

                          lineHeight: 1.45,
                        }}
                      >
                        Jawabanmu:{' '}
                        <span style={{ fontWeight: 700 }}>
                          {userAnswer || 'Tidak dijawab'}
                        </span>
                      </div>

                      {!isCorrect && (
                        <div
                          style={{
                            marginTop: '4px',

                            fontSize: '12.5px',

                            color: '#7ce3b6',

                            fontWeight: 600,

                            lineHeight: 1.45,
                          }}
                        >
                          ✓ Kunci:{' '}
                          <span style={{ fontWeight: 700 }}>
                            {q.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* RESTART BUTTON */}
          {/* ================================================= */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
              y: -2,

              boxShadow:
                `0 15px 35px ${themeConfig.glow1}`,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onRestart}
            style={{
              width: '100%',

              marginTop: '30px',

              padding: '17px',

              border: 'none',

              borderRadius: '18px',

              background: themeConfig.gradient,

              color: '#ffffff',

              fontSize: '15.5px',
              fontWeight: 900,

              cursor: 'pointer',

              boxShadow:
                `0 10px 25px ${themeConfig.glow1}`,

              transition:
                'box-shadow 0.2s ease, transform 0.2s ease',
            }}
          >
            🔄 Main Lagi
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}