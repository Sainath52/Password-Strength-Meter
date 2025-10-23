
import React from 'react';
import { StrengthLevel } from '../types';

interface StrengthMeterProps {
  level: StrengthLevel;
}

const STRENGTH_CONFIG = {
  [StrengthLevel.EMPTY]: { width: '0%', color: 'bg-gray-700', label: '' },
  [StrengthLevel.WEAK]: { width: '25%', color: 'bg-red-500', label: 'Weak' },
  [StrengthLevel.MEDIUM]: { width: '50%', color: 'bg-yellow-500', label: 'Medium' },
  [StrengthLevel.STRONG]: { width: '75%', color: 'bg-green-500', label: 'Strong' },
  [StrengthLevel.VERY_STRONG]: { width: '100%', color: 'bg-emerald-500', label: 'Very Strong' },
};

const StrengthMeter: React.FC<StrengthMeterProps> = ({ level }) => {
  const { width, color, label } = STRENGTH_CONFIG[level];

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-in-out`}
          style={{ width: width }}
          aria-label={`Password strength: ${label}`}
        />
      </div>
      <p className={`text-right mt-2 text-sm font-semibold transition-opacity duration-300 ${level === StrengthLevel.EMPTY ? 'opacity-0' : 'opacity-100'} ${color.replace('bg-','text-')}`}>
        {label}
      </p>
    </div>
  );
};

export default StrengthMeter;
