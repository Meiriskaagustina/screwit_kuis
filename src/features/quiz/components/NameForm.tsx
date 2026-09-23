import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';

import type {
  QuizCategory,
  QuizDifficulty,
  QuizThemeConfig,
} from '../api/quiz.types';
import { QUIZ_THEMES } from '../api/quiz.types';

interface NameFormProps {
  onStartQuiz: (
    playerName: string,
    category: QuizCategory,
    difficulty: QuizDifficulty,
  ) => void;
  themeConfig?: QuizThemeConfig;
}


const categoryOptions: {
  value: QuizCategory;
  label: string;
  icon: string;
  description: string;
  difficulties: QuizDifficulty[];
}[] = [
  {
    value: 'general',
    label: 'General Knowledge',
    icon: '🧠',
    description: 'Pengetahuan umum & wawasan luas',
    difficulties: ['easy', 'medium'],
  },
  {
    value: 'animals',
    label: 'Animals',
    icon: '🐾',
    description: 'Dunia hewan & fauna unik',
    difficulties: ['medium'],
  },
];

const difficultyOptions: {
  value: QuizDifficulty;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    value: 'easy',
    label: 'Easy',
    icon: '🌱',
    description: 'Santai untuk pemanasan',
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: '🔥',
    description: 'Tantangan menengah',
  },
];

export function NameForm({ onStartQuiz, themeConfig = QUIZ_THEMES.blue }: NameFormProps) {
  const [name, setName] = useState('');

  const [category, setCategory] =
    useState<QuizCategory>('general');

  const [difficulty, setDifficulty] =
    useState<QuizDifficulty>('easy');

  const selectedCategory = categoryOptions.find(
    (item) => item.value === category,
  );

  const availableDifficulties =
    selectedCategory?.difficulties ?? [];

  const handleCategoryChange = (
    newCategory: QuizCategory,
  ) => {
    setCategory(newCategory);

    const config = categoryOptions.find(
      (item) => item.value === newCategory,
    );

    if (
      config &&
      !config.difficulties.includes(difficulty)
    ) {
      setDifficulty(config.difficulties[0]);
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    onStartQuiz(
      name.trim(),
      category,
      difficulty,
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '24px 18px 50px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily:
          "'Inter', system-ui, -apple-system, sans-serif",
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
          maxWidth: '520px',
          width: '100%',
          boxSizing: 'border-box',
          padding: 'clamp(26px, 5vw, 38px)',
          borderRadius: '30px',

          background:
            'linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))',

          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',

          border:
            '1px solid rgba(255,255,255,0.20)',

          boxShadow:
            '0 30px 70px rgba(17,24,39,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',

          overflow: 'hidden',
        }}
      >
        {/* Decorative calm glow */}

        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            top: '-100px',
            right: '-90px',

            background:
              `radial-gradient(circle, ${themeConfig.glow1}, transparent 70%)`,

            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            bottom: '-90px',
            left: '-80px',

            background:
              `radial-gradient(circle, ${themeConfig.glow2}, transparent 70%)`,

            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* LOGO BADGE */}

          <motion.div
            initial={{
              scale: 0,
              rotate: -15,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 18,
              delay: 0.1,
            }}
            style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 20px',
              borderRadius: '24px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              background: themeConfig.gradient,

              fontSize: '32px',

              boxShadow:
                `0 15px 35px ${themeConfig.glow1}, inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}
          >
            🎯
          </motion.div>

          {/* HEADING */}

          <div
            style={{
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: themeConfig.accent,
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              Interactive Quiz Platform
            </div>

            <h1
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              ScrewIt Quiz
            </h1>

            <p
              style={{
                margin: '8px 0 0',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '13.5px',
                lineHeight: 1.5,
              }}
            >
              Uji wawasanmu. Pilih kategori & tingkat kesulitan, lalu mulai tantangan! 🚀
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            {/* NAME */}

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: themeConfig.accent,
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                }}
              >
                NAMA PEMAIN
              </label>

              <motion.input
                className="quiz-name-input"
                type="text"
                placeholder="Masukkan nama panggilanmu..."
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                whileFocus={{
                  scale: 1.01,
                }}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '16px',

                  background:
                    'rgba(255,255,255,0.075)',

                  border:
                    '1px solid rgba(255,255,255,0.14)',

                  color: '#ffffff',

                  fontSize: '14px',
                  fontWeight: 600,

                  outline: 'none',

                  transition: 'all 0.2s ease',
                }}
                required
              />
            </div>

            {/* CATEGORY */}

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <label
                  style={{
                    color: themeConfig.accent,
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                  }}
                >
                  KATEGORI
                </label>

                <span
                  style={{
                    color: 'rgba(255,255,255,0.40)',
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  Pilih topik
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(2, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                {categoryOptions.map((item) => {
                  const isSelected =
                    category === item.value;

                  return (
                    <motion.button
                      key={item.value}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        handleCategoryChange(
                          item.value,
                        )
                      }
                      style={{
                        padding: '16px 14px',
                        borderRadius: '18px',

                        border: isSelected
                          ? `1.5px solid ${themeConfig.selectedBorder}`
                          : '1px solid rgba(255,255,255,0.14)',

                        background: isSelected
                          ? themeConfig.selectedBg
                          : 'rgba(255,255,255,0.075)',

                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',

                        boxShadow: isSelected
                          ? themeConfig.selectedShadow
                          : 'none',

                        transition: 'border 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '24px',
                          marginBottom: '8px',
                        }}
                      >
                        {item.icon}
                      </div>

                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          marginBottom: '4px',
                          color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.9)',
                        }}
                      >
                        {item.label}
                      </div>

                      <div
                        style={{
                          fontSize: '10px',
                          lineHeight: 1.4,
                          color: isSelected
                            ? 'rgba(255,255,255,0.75)'
                            : 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {item.description}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* DIFFICULTY */}

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: themeConfig.accent,
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                }}
              >
                TINGKAT KESULITAN
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(2, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                {difficultyOptions.map((item) => {
                  const isAvailable =
                    availableDifficulties.includes(
                      item.value,
                    );

                  const isSelected =
                    difficulty === item.value;

                  return (
                    <motion.button
                      key={item.value}
                      type="button"
                      disabled={!isAvailable}
                      whileHover={
                        isAvailable
                          ? { y: -2 }
                          : {}
                      }
                      whileTap={
                        isAvailable
                          ? { scale: 0.97 }
                          : {}
                      }
                      onClick={() => {
                        if (isAvailable) {
                          setDifficulty(
                            item.value,
                          );
                        }
                      }}
                      style={{
                        padding: '14px',
                        borderRadius: '16px',

                        border: isSelected
                          ? `1.5px solid ${themeConfig.selectedBorder}`
                          : '1px solid rgba(255,255,255,0.14)',

                        background: isSelected
                          ? themeConfig.selectedBg
                          : 'rgba(255,255,255,0.075)',

                        color: isAvailable
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.22)',

                        cursor: isAvailable
                          ? 'pointer'
                          : 'not-allowed',

                        opacity: isAvailable
                          ? 1
                          : 0.45,

                        textAlign: 'left',

                        boxShadow: isSelected
                          ? themeConfig.selectedShadow
                          : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '20px',
                          marginBottom: '6px',
                        }}
                      >
                        {item.icon}
                      </div>

                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                        }}
                      >
                        {item.label}
                      </div>

                      <div
                        style={{
                          fontSize: '10px',
                          marginTop: '3px',
                          color: isAvailable
                            ? 'rgba(255,255,255,0.5)'
                            : 'rgba(255,255,255,0.22)',
                        }}
                      >
                        {isAvailable
                          ? item.description
                          : 'Tidak tersedia'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* START BUTTON */}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow:
                  `0 15px 35px ${themeConfig.glow1}`,
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                marginTop: '6px',
                padding: '16px',
                border: 'none',
                borderRadius: '16px',

                background: themeConfig.gradient,

                color: '#ffffff',

                fontSize: '15px',
                fontWeight: 900,

                cursor: 'pointer',

                boxShadow:
                  `0 10px 25px ${themeConfig.glow1}`,

                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              🚀 Mulai Permainan
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}



