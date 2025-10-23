
import React from 'react';
import { Criteria } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface StrengthCriteriaProps {
  criteria: Criteria;
}

interface CriteriaItemProps {
    isMet: boolean;
    text: string;
}

const CriteriaItem: React.FC<CriteriaItemProps> = ({ isMet, text }) => (
    <li className={`flex items-center transition-colors duration-300 ${isMet ? 'text-emerald-400' : 'text-gray-500'}`}>
        {isMet ? <CheckIcon /> : <XIcon />}
        <span className="ml-2">{text}</span>
    </li>
);

const StrengthCriteria: React.FC<StrengthCriteriaProps> = ({ criteria }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
      <CriteriaItem isMet={criteria.length} text="At least 8 characters" />
      <CriteriaItem isMet={criteria.lowercase} text="Contains a lowercase letter" />
      <CriteriaItem isMet={criteria.uppercase} text="Contains an uppercase letter" />
      <CriteriaItem isMet={criteria.number} text="Contains a number" />
      <CriteriaItem isMet={criteria.specialChar} text="Contains a special character" />
    </ul>
  );
};

export default StrengthCriteria;
