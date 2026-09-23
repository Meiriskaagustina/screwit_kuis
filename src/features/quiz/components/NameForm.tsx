import { useState } from 'react';
import type { FormEvent } from 'react'; // Pakai 'type' untuk import tipe data

interface NameFormProps {
  onStartQuiz: (playerName: string) => void;
}

export function NameForm({ onStartQuiz }: NameFormProps) {
  const [name, setName] = useState('');

  // Perbarui penulisan event-nya di sini
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onStartQuiz(name.trim());
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Selamat Datang di ScrewIt Quiz! 🎯</h2>
      <p>Masukkan nama kamu untuk memulai permainan:</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Nama kamu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Mulai Kuis
        </button>
      </form>
    </div>
  );
}