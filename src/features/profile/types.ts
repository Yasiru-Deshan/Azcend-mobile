export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatarUrl: string;
  subscription: 'Free' | 'Pro' | 'Elite';
  joinedAt: string;
}

export interface CheckinProgressPhotos {
  front: string;
  back: string;
  side: string;
}

export interface CheckinProgressData {
  id?: string;
  date: string;
  weight?: number;
  chest?: number;
  upperArm?: number;
  waist?: number;
  stomach?: number;
  hip?: number;
  glutes?: number;
  thigh?: number;
  photos?: CheckinProgressPhotos;
}
