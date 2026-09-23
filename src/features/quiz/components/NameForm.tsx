import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';

import type {
  QuizCategory,
  QuizDifficulty,
} from '../api/quiz.api';

interface NameFormProps {
  onStartQuiz: (
    playerName: string,
    category: QuizCategory,
    difficulty: QuizDifficulty,
  ) => void;
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
    description: 'Pengetahuan umum sehari-hari',
    difficulties: ['easy', 'medium'],
  },
  {
    value: 'animals',
    label: 'Animals',
    icon: '🐾',
    description: 'Dunia hewan dan satwa',
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
    description: 'Sedikit lebih menantang',
  },
];

export function NameForm({ onStartQuiz }: NameFormProps) {
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

        background:
          'radial-gradient(circle at 10% 10%, rgba(91,141,239,0.18), transparent 30%),' +
          'radial-gradient(circle at 90% 5%, rgba(111,163,168,0.16), transparent 32%),' +
          'radial-gradient(circle at 50% 100%, rgba(143,179,217,0.12), transparent 38%),' +
          'linear-gradient(135deg, #172033 0%, #1d2939 50%, #243447 100%)',

        fontFamily:
          "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
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
          maxWidth: '500px',
          width: '100%',
          boxSizing: 'border-box',
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

          overflow: 'hidden',
        }}
      >
        {/* Decorative glow */}

        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            top: '-90px',
            right: '-80px',

            background:
              'radial-gradient(circle, rgba(91,141,239,0.20), transparent 70%)',

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
              'radial-gradient(circle, rgba(111,163,168,0.18), transparent 70%)',

            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* LOGO */}

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
              stiffness: 260,
              damping: 20,
              delay: 0.15,
            }}
            style={{
              width: '68px',
              height: '68px',
              margin: '0 auto 18px',
              borderRadius: '22px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              background:
                'linear-gradient(135deg, #5B8DEF 0%, #6FA3A8 100%)',

              fontSize: '30px',

              boxShadow:
                '0 15px 30px rgba(91,141,239,0.22)',
            }}
          >
            🎯
          </motion.div>

          {/* HEADING */}

          <div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
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
                color: 'rgba(255,255,255,0.58)',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              Uji wawasanmu. Pilih kategori,
              pilih tingkat kesulitan, lalu gas! 🚀
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
                  color: 'rgba(255,255,255,0.75)',
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
                  borderRadius: '15px',

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
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                  }}
                >
                  KATEGORI
                </label>

                <span
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '10px',
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
                  gap: '10px',
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
                        padding: '15px 12px',
                        borderRadius: '17px',

                        border: isSelected
                          ? '1.5px solid rgba(91,141,239,0.75)'
                          : '1px solid rgba(255,255,255,0.13)',

                        background: isSelected
                          ? 'rgba(91,141,239,0.16)'
                          : 'rgba(255,255,255,0.06)',

                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',

                        boxShadow: isSelected
                          ? '0 10px 25px rgba(91,141,239,0.16)'
                          : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '22px',
                          marginBottom: '8px',
                        }}
                      >
                        {item.icon}
                      </div>

                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          marginBottom: '3px',
                        }}
                      >
                        {item.label}
                      </div>

                      <div
                        style={{
                          fontSize: '9px',
                          lineHeight: 1.4,
                          color:
                            'rgba(255,255,255,0.42)',
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
                  color: 'rgba(255,255,255,0.75)',
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
                  gap: '10px',
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
                          ? '1.5px solid rgba(91,141,239,0.75)'
                          : '1px solid rgba(255,255,255,0.13)',

                        background: isSelected
                          ? 'rgba(91,141,239,0.16)'
                          : 'rgba(255,255,255,0.06)',

                        color: isAvailable
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.22)',

                        cursor: isAvailable
                          ? 'pointer'
                          : 'not-allowed',

                        opacity: isAvailable
                          ? 1
                          : 0.5,

                        textAlign: 'left',
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
                          fontSize: '9px',
                          marginTop: '3px',
                          color:
                            'rgba(255,255,255,0.42)',
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

            {/* START */}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow:
                  '0 15px 35px rgba(91,141,239,0.28)',
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                marginTop: '2px',
                padding: '15px',
                border: 'none',
                borderRadius: '16px',

                background:
                  'linear-gradient(135deg, #5B8DEF 0%, #6FA3A8 100%)',

                color: '#ffffff',

                fontSize: '14px',
                fontWeight: 900,

                cursor: 'pointer',

                boxShadow:
                  '0 10px 25px rgba(91,141,239,0.22)',
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

