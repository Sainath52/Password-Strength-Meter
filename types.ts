
export enum StrengthLevel {
  EMPTY = 'EMPTY',
  WEAK = 'WEAK',
  MEDIUM = 'MEDIUM',
  STRONG = 'STRONG',
  VERY_STRONG = 'VERY_STRONG',
}

export interface StrengthResult {
  level: StrengthLevel;
  score: number; // e.g., 0-4
}

export interface Criteria {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
}
