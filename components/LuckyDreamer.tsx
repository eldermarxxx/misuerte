import React, { useState } from 'react';
import { generateLuckyNumbers } from '../services/geminiService';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LuckyDreamerProps {
  onNumbersGenerated: (numbers: number[]) => void;
  maxNumber: number;
}

export const LuckyDreamer: React.FC<LuckyDreamerProps> = ({ onNumbersGenerated, maxNumber }) => {
  const { t } = useLanguage();
  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDream = async () => {
    if (!dream.trim()) return;
    setLoading(true);
    setError('');
    try {
      // Generate 5 lucky numbers based on the dream
      const numbers = await generateLuckyNumbers(dream, 1, maxNumber, 5);
      onNumbersGenerated(numbers);
      setDream('');
    } catch (err) {
      setError(t('dreamer.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="text-yellow-400 w-6 h-6" />
        <h3 className="text-xl font-bold">{t('dreamer.title')}</h3>
      </div>
      <p className="text-indigo-200 mb-4 text-sm">
        {t('dreamer.description')}
      </p>
      
      <div className="space-y-3">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder={t('dreamer.placeholder')}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 resize-none"
        />
        
        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button
          onClick={handleDream}
          disabled={loading || !dream.trim()}
          className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              {t('dreamer.loading')}
            </>
          ) : (
            <>
              <BrainCircuit className="w-5 h-5" />
              {t('dreamer.reveal')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};