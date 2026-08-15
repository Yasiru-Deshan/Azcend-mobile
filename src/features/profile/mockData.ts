import type { UserProfile, CheckinProgressData } from './types';

export const mockUserProfile: UserProfile = {
  id: 'usr_1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  mobile: '+1 (555) 123-4567',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  subscription: 'Pro',
  joinedAt: '2025-01-15T00:00:00Z',
};

const defaultPhotos = {
  front: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
  back: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
  side: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
};

export const mockCheckinHistory: CheckinProgressData[] = [
  {
    id: 'chk_1',
    date: '2026-05-01',
    weight: 85,
    chest: 102,
    upperArm: 36,
    waist: 90,
    stomach: 92,
    hip: 100,
    glutes: 104,
    thigh: 60,
    photos: defaultPhotos,
  },
  {
    id: 'chk_2',
    date: '2026-05-08',
    weight: 84.5,
    chest: 102,
    upperArm: 36.2,
    waist: 89.5,
    stomach: 91,
    hip: 99.5,
    glutes: 103.5,
    thigh: 59.8,
    photos: defaultPhotos,
  },
  {
    id: 'chk_3',
    date: '2026-05-15',
    weight: 84,
    chest: 102.5,
    upperArm: 36.5,
    waist: 89,
    stomach: 90,
    hip: 99,
    glutes: 104,
    thigh: 59.5,
    photos: defaultPhotos,
  },
];
