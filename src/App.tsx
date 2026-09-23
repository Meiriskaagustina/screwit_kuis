import { useEffect, useState } from 'react';
import { fetchQuestions } from './features/quiz/api/quiz.api';
import type { Question } from './features/quiz/api/quiz.types';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions(5).then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading soal dari OpenTDB...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Tes API OpenTDB 🎯</h1>
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
}