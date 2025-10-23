
import React, { useState, useRef } from 'react';
import { generatePassword } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onPasswordGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const hintTimeoutRef = useRef<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please provide a hint for your password.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHint(null);
    if(hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

    try {
      const result = await generatePassword(prompt);
      if (result && result.password) {
        onPasswordGenerated(result.password);
        if(result.hint) {
            setHint(`Hint: ${result.hint}`);
            hintTimeoutRef.current = window.setTimeout(() => setHint(null), 8000);
        }
      } else {
        throw new Error('Failed to generate a valid password.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 space-y-4">
      <h2 className="text-lg font-semibold text-center text-cyan-400">AI Password Generator</h2>
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., for my gaming account, space themed"
          className="w-full bg-gray-900/50 text-white placeholder-gray-500 px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 outline-none"
          disabled={isLoading}
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon />
            <span className="ml-2">Generate Secure Password</span>
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      {hint && <p className="text-cyan-300 text-sm text-center animate-pulse">{hint}</p>}
    </div>
  );
};

export default PasswordGenerator;
