import type { CheckinProgressData } from './types';
import { ChartColors } from '@/constants/theme';

export const CHECKIN_PHOTO_VIEWS = [
  { key: 'front' as const, label: 'Front' },
  { key: 'back' as const, label: 'Back' },
  { key: 'side' as const, label: 'Side' },
];

export const PROFILE_MEASUREMENT_TABS: {
  id: keyof Omit<CheckinProgressData, 'date' | 'photos' | 'id'>;
  label: string;
  color: string;
}[] = [
  { id: 'weight', label: 'Weight', color: ChartColors.blue },
  { id: 'chest', label: 'Chest', color: ChartColors.purple },
  { id: 'upperArm', label: 'Upper Arm', color: ChartColors.pink },
  { id: 'waist', label: 'Waist', color: ChartColors.rose },
  { id: 'stomach', label: 'Stomach', color: ChartColors.orange },
  { id: 'hip', label: 'Hip', color: ChartColors.yellow },
  { id: 'glutes', label: 'Glutes', color: ChartColors.lime },
  { id: 'thigh', label: 'Thigh', color: ChartColors.green },
];
