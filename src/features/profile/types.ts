export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatarUrl: string;
  subscription: 'Free' | 'Pro' | 'Elite';
  joinedAt: string;
}
