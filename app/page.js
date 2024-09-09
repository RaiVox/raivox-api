"use client"; 

import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Initialize SpeechRecognition API
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.interimResults = true;
      recognition.lang = 'es-ES';

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      console.error('SpeechRecognition API not supported');
    }
  }, [isListening]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Enviar el mensaje a la API de Gemini
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setReply(data.reply);
    setLoading(false);

    // Reproducir la respuesta usando texto a voz
    speakText(data.reply);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis API not supported');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl mb-4">Raivox Chat</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
          rows="4"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        <button
          type="button"
          className={`w-full p-2 mt-2 ${isListening ? 'bg-red-500' : 'bg-green-500'} hover:${isListening ? 'bg-red-600' : 'bg-green-600'} rounded text-white`}
          onClick={handleVoiceInput}
        >
          {isListening ? 'Detener Escucha' : 'Hablar'}
        </button>
      </form>

      {reply && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h2 className="text-lg">Respuesta de la IA:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
