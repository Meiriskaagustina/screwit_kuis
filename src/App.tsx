```import { useEffect, useState } from 'react';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type { Question } from './features/quiz/api/quiz.types';
import { NameForm } from './features/quiz/components/NameForm';

export default function App() {
  const [playerName, setPlayerName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = (name: string) => {
    setPlayerName(name);
    setLoading(true);
    
    fetchQuestions(5).then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  };

  // 1. Tampilan awal jika belum isi nama
  if (!playerName) {
    return <NameForm onStartQuiz={handleStartQuiz} />;
  }

  // 2. Tampilan loading saat ambil soal
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading soal dari OpenTDB...</p>;
  }

  // 3. Tampilan kuis (sementara)
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Halo, {playerName}! 👋</h1>
      <p>Berikut soal kuis kamu:</p>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '15px' }}>
          <p><strong>{q.id}. {q.question}</strong></p>
          <ul>
            {q.answers.map((ans, i) => (
              <li key={i}>{ans}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}```