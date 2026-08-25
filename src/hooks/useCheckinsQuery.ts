import { useQuery } from '@tanstack/react-query';
import { fetchClientCheckinsApi } from '../services/checkin.service';
import { useAuthStore } from '../store/auth.store';

export function useCheckinsQuery() {
  const { token, profile } = useAuthStore();

  return useQuery({
    queryKey: ['checkins', profile?.id],
    queryFn: async () => {
      if (!token || !profile?.id) return [];
      const response = await fetchClientCheckinsApi(profile.id, token);
      return response.data || [];
    },
    enabled: !!token && !!profile?.id,
    staleTime: 1000 * 60 * 5,
  });
}
