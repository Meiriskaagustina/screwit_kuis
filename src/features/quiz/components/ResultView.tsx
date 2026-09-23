import type { Question } from '../api/quiz.types';

interface ResultViewProps {
  playerName: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
}

export function ResultView({
  playerName,
  questions,
  userAnswers,
  onRestart,
}: ResultViewProps) {
  // Hitung jumlah jawaban benar
  const correctCount = questions.reduce((count, question, index) => {
    return userAnswers[index] === question.correctAnswer ? count + 1 : count;
  }, 0);

  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  return (
    <div
      style={{
        maxWidth: '650px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2>🎉 Kuis Selesai! 🎉</h2>
        <p style={{ fontSize: '18px', color: '#374151' }}>
          Kerja bagus, <strong>{playerName}</strong>!
        </p>
        <div
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#4f46e5',
            margin: '16px 0',
          }}
        >
          Skor Kamu: {scorePercentage}%
        </div>
        <p style={{ color: '#6b7280' }}>
          Kamu menjawab <strong>{correctCount}</strong> dari <strong>{questions.length}</strong> soal dengan benar.
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />

      {/* Ringkasan Jawaban */}
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Detail Ringkasan:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              style={{
                padding: '14px',
                borderRadius: '8px',
                backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
              }}
            >
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1f2937' }}>
                {index + 1}. {q.question}
              </p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: isCorrect ? '#166534' : '#991b1b' }}>
                Jawaban kamu: <strong>{userAnswer || 'Tidak dijawab'}</strong> {isCorrect ? '✅' : '❌'}
              </p>
              {!isCorrect && (
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#166534' }}>
                  Jawaban benar: <strong>{q.correctAnswer}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Tombol Restart */}
      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔄 Main Lagi
        </button>
      </div>
    </div>
  );
}