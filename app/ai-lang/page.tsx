'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { db } from '@/services/firbase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

interface WordResponse {
  單字清單: string[];
  單字中文意義清單: string[];
}

interface WordCardData {
  id: number;
  topic: string;
  language: string;
  words: string[];
  translations: string[];
  timestamp: number;
  examples: { [key: string]: string };
}

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">AI 單字聯想</h1>
        <p className="mt-2 text-lg">透過人工智慧，探索單字之間的關聯性</p>
      </div>
    </header>
  );
};

const WordCard = ({ 
  id,
  topic, 
  language, 
  words, 
  translations, 
  examples,
  onGenerateExample 
}: {
  id: number;
  topic: string;
  language: string;
  words: string[];
  translations: string[];
  examples: { [key: string]: string };
  onGenerateExample: (word: string, translation: string, language: string, index: number) => Promise<void>;
}) => {
  const [loadingExamples, setLoadingExamples] = useState<{ [key: string]: boolean }>({});
  const [playingAudio, setPlayingAudio] = useState<{ [key: string]: boolean }>({});

  const handleGenerateExample = async (word: string, translation: string, index: number) => {
    setLoadingExamples(prev => ({ ...prev, [word]: true }));
    try {
      await onGenerateExample(word, translation, language, index);
    } finally {
      setLoadingExamples(prev => ({ ...prev, [word]: false }));
    }
  };

  const handlePlayAudio = async (example: string, word: string) => {
    if (!example) return;
    
    setPlayingAudio(prev => ({ ...prev, [word]: true }));
    try {
      const response = await fetch('/api/tts-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: example,
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const data = await response.json();
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setPlayingAudio(prev => ({ ...prev, [word]: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">主題：{topic}</h2>
        <p className="text-gray-600">語言：{language}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {words.map((word, index) => (
          <div key={index} className="w-[calc(50%-8px)] bg-orange-50 rounded-lg p-4">
            <p className="text-lg font-semibold text-orange-600">{word}</p>
            <p className="text-gray-600 mb-3">{translations[index]}</p>
            <button
              onClick={() => handleGenerateExample(word, translations[index], index)}
              disabled={loadingExamples[word]}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${loadingExamples[word]
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                }`}
            >
              {loadingExamples[word] ? '生成中...' : '生成例句'}
            </button>
            {examples[word] && (
              <div className="mt-3 p-3 bg-white rounded-md border border-orange-200">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-700 flex-1">{examples[word]}</p>
                  <button
                    onClick={() => handlePlayAudio(examples[word], word)}
                    disabled={playingAudio[word]}
                    className={`ml-2 p-2 rounded-full transition-colors
                      ${playingAudio[word]
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                  >
                    <FontAwesomeIcon icon={faVolumeUp} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AILangPage() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('英文');
  const [loading, setLoading] = useState(false);
  const [wordCards, setWordCards] = useState<WordCardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 從 Firestore 讀取數據
  useEffect(() => {
    const fetchWordCards = async () => {
      try {
        const q = query(collection(db, 'word-ai'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const cards: WordCardData[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          cards.push({
            id: data.id,
            topic: data.topic,
            language: data.language,
            words: data.words,
            translations: data.translations,
            timestamp: data.timestamp,
            examples: data.examples || {}
          });
        });

        setWordCards(cards);
      } catch (err) {
        console.error('Error fetching word cards:', err);
        alert('讀取單字卡失敗');
      }
    };

    fetchWordCards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/word-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, language }),
      });

      if (!response.ok) {
        throw new Error('API 請求失敗');
      }

      const data = await response.json();
      
      const newCard: WordCardData = {
        id: Date.now(),
        topic,
        language,
        words: data.單字清單,
        translations: data.單字中文意義清單,
        timestamp: Date.now(),
        examples: {}
      };

      // 存儲到 Firestore
      try {
        await addDoc(collection(db, 'word-ai'), newCard);
        setWordCards(prevCards => [newCard, ...prevCards]);
        setTopic('');
      } catch (err) {
        console.error('Error saving to Firestore:', err);
        alert('儲存單字卡失敗');
      }
    } catch (err) {
      setError('發生錯誤，請稍後再試');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateExample = async (cardId: number, word: string, translation: string, language: string, index: number) => {
    try {
      const response = await fetch('/api/sentence-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          word,
          translation,
          language
        }),
      });

      if (!response.ok) {
        throw new Error('生成例句失敗');
      }

      const data = await response.json();
      
      setWordCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId
            ? {
                ...card,
                examples: {
                  ...card.examples,
                  [word]: data.example
                }
              }
            : card
        )
      );
    } catch (err) {
      console.error('Error generating example:', err);
      alert('生成例句失敗');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                請輸入主題名稱
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="例如：動物、食物、運動..."
                required
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                選擇語言
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="英文">英文</option>
                <option value="日文">日文</option>
                <option value="韓文">韓文</option>
                <option value="法文">法文</option>
                <option value="德文">德文</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 px-6 rounded-md hover:from-orange-500 hover:to-orange-700 transition-all duration-200 shadow-md ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '處理中...' : '讓AI聯想相關單字'}
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {wordCards.map((card) => (
            <WordCard
              key={card.id}
              id={card.id}
              topic={card.topic}
              language={card.language}
              words={card.words}
              translations={card.translations}
              examples={card.examples}
              onGenerateExample={(word, translation, language, index) => 
                handleGenerateExample(card.id, word, translation, language, index)
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
