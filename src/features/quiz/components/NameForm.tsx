import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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
    description: 'Pengetahuan umum & wawasan dunia',
    difficulties: ['easy', 'medium'],
  },
  {
    value: 'animals',
    label: 'Animals',
    icon: '🐾',
    description: 'Dunia satwa & fauna unik',
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
    description: 'Tantangan menengah seru',
  },
];

export function NameForm({
  onStartQuiz,
  themeConfig = QUIZ_THEMES.purple,
}: NameFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<QuizCategory>('general');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('easy');

  const selectedCategory = categoryOptions.find(
    (item) => item.value === category,
  );

  const availableDifficulties = selectedCategory?.difficulties ?? [];

  const handleCategoryChange = (newCategory: QuizCategory) => {
    setCategory(newCategory);

    const config = categoryOptions.find((item) => item.value === newCategory);

    if (config && !config.difficulties.includes(difficulty)) {
      setDifficulty(config.difficulties[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Silakan isi nama kamu terlebih dahulu!', {
        id: 'name-empty',
        icon: '⚠️',
      });
      return;
    }

    onStartQuiz(name.trim(), category, difficulty);
  };

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '560px',
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
          transform: 'rotate(-7deg)',
          zIndex: 5,
          userSelect: 'none',
        }}
      >
        ★ 100% SERU ★
      </div>

      <div
        className="neo-desktop-decor"
        style={{
          position: 'absolute',
          bottom: '18px',
          right: '-46px',
          background: themeConfig.accent,
          color: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 900,
          transform: 'rotate(6deg)',
          zIndex: 5,
          userSelect: 'none',
        }}
      >
        ⚡ TRIVIA TIME ⚡
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          padding: 'clamp(24px, 5vw, 36px)',
          borderRadius: '20px',
          background: themeConfig.surface,
          border: '4px solid #000000',
          boxShadow: '10px 10px 0px #000000',
        }}
      >
        {/* TOP BADGE STRIP */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: themeConfig.highlight,
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              color: '#000000',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            ★ OFFICIAL QUIZ APP ★
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: themeConfig.primary,
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              color: themeConfig.contrastText,
              fontSize: '11px',
              fontWeight: 900,
            }}
          >
            🎮 10 SOAL TRIVIA
          </span>
        </div>

        {/* LOGO FOCAL POINT */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '22px',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              display: 'inline-block',
              padding: '12px 18px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '3.5px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              marginBottom: '14px',
            }}
          >
            <img
              src="/images/screw-it-logo.png"
              alt="Screw It Logo"
              style={{
                display: 'block',
                maxHeight: '85px',
                maxWidth: '220px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                margin: '0 auto',
              }}
            />
          </motion.div>

          <h1
            style={{
              margin: '0 0 6px',
              color: '#000000',
              fontSize: 'clamp(26px, 6vw, 34px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
            }}
          >
            ScrewIt Quiz
          </h1>

          <p
            style={{
              margin: 0,
              color: '#374151',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Tantang wawasanmu! Masukkan nama, pilih mode, dan mulai permainan! 🚀
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* NAME INPUT */}
          <div>
            <label
              htmlFor="player-name-input"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span>✏️</span> NAMA PEMAIN:
            </label>

            <input
              id="player-name-input"
              className="quiz-name-input"
              type="text"
              placeholder="Ketik nama kamu di sini..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                color: '#000000',
                fontSize: '15px',
                fontWeight: 800,
                transition: 'all 0.15s ease',
              }}
              required
            />
          </div>

          {/* CATEGORY SELECTOR */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#000000',
                  fontSize: '12px',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <span>📚</span> PILIH KATEGORI:
              </label>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#4B5563',
                }}
              >
                2 Pilihan
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '10px',
              }}
            >
              {categoryOptions.map((item) => {
                const isSelected = category === item.value;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2 }}
                    onClick={() => handleCategoryChange(item.value)}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '14px',
                      border: '3px solid #000000',
                      background: isSelected ? themeConfig.primary : '#FFFFFF',
                      color: isSelected ? themeConfig.contrastText : '#000000',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: isSelected
                        ? '5px 5px 0px #000000'
                        : '3px 3px 0px #000000',
                      transform: isSelected
                        ? 'translate(-2px, -2px)'
                        : 'translate(0px, 0px)',
                      transition:
                        'background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      {isSelected && (
                        <span
                          style={{
                            background: themeConfig.highlight,
                            color: '#000000',
                            border: '1.5px solid #000000',
                            fontSize: '10px',
                            fontWeight: 900,
                            padding: '2px 6px',
                            borderRadius: '6px',
                          }}
                        >
                          ✓ AKTIF
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 900,
                        lineHeight: 1.25,
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>

                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: isSelected
                          ? themeConfig.contrastText === '#FFFFFF'
                            ? '#FEF08A'
                            : '#374151'
                          : '#4B5563',
                      }}
                    >
                      {item.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* DIFFICULTY SELECTOR */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span>⚡</span> TINGKAT KESULITAN:
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '10px',
              }}
            >
              {difficultyOptions.map((item) => {
                const isAvailable = availableDifficulties.includes(item.value);
                const isSelected = difficulty === item.value;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    disabled={!isAvailable}
                    whileHover={isAvailable ? { y: -2 } : {}}
                    whileTap={isAvailable ? { y: 2 } : {}}
                    onClick={() => {
                      if (isAvailable) {
                        setDifficulty(item.value);
                      }
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '3px solid #000000',
                      background: !isAvailable
                        ? '#E5E7EB'
                        : isSelected
                          ? themeConfig.primary
                          : '#FFFFFF',
                      color: !isAvailable
                        ? '#9CA3AF'
                        : isSelected
                          ? themeConfig.contrastText
                          : '#000000',
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      textAlign: 'left',
                      boxShadow: isSelected
                        ? '5px 5px 0px #000000'
                        : isAvailable
                          ? '3px 3px 0px #000000'
                          : 'none',
                      transform: isSelected
                        ? 'translate(-2px, -2px)'
                        : 'translate(0px, 0px)',
                      opacity: isAvailable ? 1 : 0.5,
                      transition:
                        'background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{item.icon}</span>
                      {isSelected && (
                        <span
                          style={{
                            background: themeConfig.highlight,
                            color: '#000000',
                            border: '1.5px solid #000000',
                            fontSize: '9px',
                            fontWeight: 900,
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          PILIHAN
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 900,
                      }}
                    >
                      {item.label}
                    </div>

                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: !isAvailable
                          ? '#9CA3AF'
                          : isSelected
                            ? themeConfig.contrastText === '#FFFFFF'
                              ? '#FEF08A'
                              : '#374151'
                            : '#4B5563',
                      }}
                    >
                      {isAvailable ? item.description : 'Tidak tersedia'}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* SUBMIT BUTTON (THEME-AWARE PRIMARY COLOR) */}
          <motion.button
            type="submit"
            whileHover={{ y: -3, boxShadow: '8px 8px 0px #000000' }}
            whileTap={{ y: 2, boxShadow: '2px 2px 0px #000000' }}
            style={{
              marginTop: '8px',
              padding: '16px 20px',
              borderRadius: '14px',
              border: '3.5px solid #000000',
              background: themeConfig.primary,
              color: themeConfig.contrastText,
              fontSize: '16px',
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '6px 6px 0px #000000',
              transition:
                'transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease',
            }}
          >
            🚀 MULAI PERMAINAN SEKARANG
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
