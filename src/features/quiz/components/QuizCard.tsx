import type { Question } from '../api/quiz.types';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
}

export function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
}: QuizCardProps) {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Indikator Progres Soal */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          color: '#666',
          fontSize: '14px',
        }}
      >
        <span>
          Soal <strong>{currentIndex + 1}</strong> dari <strong>{totalQuestions}</strong>
        </span>
      </div>

      {/* Pertanyaan */}
      <h3
        style={{
          fontSize: '18px',
          lineHeight: '1.5',
          color: '#1f2937',
          marginBottom: '20px',
        }}
      >
        {question.question}
      </h3>

      {/* Pilihan Jawaban */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(answer)}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: '15px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                backgroundColor: isSelected ? '#eef2ff' : '#f9fafb',
                color: isSelected ? '#4f46e5' : '#374151',
                fontWeight: isSelected ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {/* Tombol Lanjut */}
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <button
          onClick={onNextQuestion}
          disabled={!selectedAnswer}
          style={{
            padding: '10px 24px',
            fontSize: '15px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: selectedAnswer ? '#4f46e5' : '#d1d5db',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: selectedAnswer ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease',
          }}
        >
          {currentIndex === totalQuestions - 1 ? 'Selesai' : 'Lanjut →'}
        </button>
      </div>
    </div>
  );
}