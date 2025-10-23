
import React, { useState, useMemo, useCallback } from 'react';
import { StrengthLevel, StrengthResult, Criteria } from './types';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import StrengthCriteria from './components/StrengthCriteria';
import PasswordGenerator from './components/PasswordGenerator';

const App: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  
  const calculateStrength = (pass: string): { result: StrengthResult, criteria: Criteria } => {
    let score = 0;
    const criteria: Criteria = {
      length: pass.length >= 8,
      lowercase: /[a-z]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      specialChar: /[^A-Za-z0-9]/.test(pass),
    };

    if (criteria.length) {
      const fulfilledCriteria = Object.values(criteria).filter(Boolean).length;
      
      if (pass.length >= 12 && fulfilledCriteria >= 4) {
        score = 4;
      } else if (pass.length >= 8 && fulfilledCriteria >= 3) {
        score = 3;
      } else if (pass.length >= 8 && fulfilledCriteria >= 2) {
        score = 2;
      } else if (pass.length >= 8) {
        score = 1;
      } else {
        score = 0;
      }
    } else {
        score = 0;
    }

    if(pass.length === 0) {
        score = -1; // Special case for empty
    }

    let level: StrengthLevel;
    switch (score) {
      case 4:
        level = StrengthLevel.VERY_STRONG;
        break;
      case 3:
        level = StrengthLevel.STRONG;
        break;
      case 2:
        level = StrengthLevel.MEDIUM;
        break;
      case 1:
      case 0:
        level = StrengthLevel.WEAK;
        break;
      default:
        level = StrengthLevel.EMPTY;
    }
    
    return { result: { level, score }, criteria };
  };

  const { result: strengthResult, criteria: metCriteria } = useMemo(() => calculateStrength(password), [password]);
  
  const onPasswordGenerated = useCallback((newPassword: string) => {
    setPassword(newPassword);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-slate-800 font-sans">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">Password Guardian</h1>
          <p className="text-gray-400 mt-2">Test your password strength and generate secure ones with AI.</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-gray-700">
          <div className="space-y-6">
            <PasswordInput password={password} setPassword={setPassword} />
            <StrengthMeter level={strengthResult.level} />
            <StrengthCriteria criteria={metCriteria} />
          </div>
        </main>

        <footer className="mt-8">
            <PasswordGenerator onPasswordGenerated={onPasswordGenerated} />
        </footer>
      </div>
    </div>
  );
};

export default App;
