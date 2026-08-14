export interface CheckinMeasurement {
  id: string;
  label: string;
}

export interface CheckinQuestion {
  id: string;
  question: string;
}

export type UnitSystem = 'metric' | 'imperial';

export const CHECKIN_MEASUREMENTS: CheckinMeasurement[] = [
  { id: 'weight', label: 'Weight' },
  { id: 'chest', label: 'Chest' },
  { id: 'upperArm', label: 'Upper Arm' },
  { id: 'waist', label: 'Waist' },
  { id: 'stomach', label: 'Stomach' },
  { id: 'hip', label: 'Hip' },
  { id: 'glutes', label: 'Glutes' },
  { id: 'thigh', label: 'Thigh' },
];

export const CHECKIN_QUESTIONS: CheckinQuestion[] = [
  {
    id: 'wins',
    question: 'What were your biggest wins this week?',
  },
  {
    id: 'struggles',
    question: 'Did you face any struggles or obstacles?',
  },
  {
    id: 'goals',
    question: 'What is your primary goal for next week?',
  },
];
