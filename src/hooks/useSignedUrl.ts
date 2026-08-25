import { useQuery } from '@tanstack/react-query';
import { StorageService } from '../services/storage.service';

/**
 * Returns a fresh signed URL for a given S3 key (or raw https URL).
 */
export function useSignedUrl(key?: string | null) {
  return useQuery({
    queryKey: ['signedUrl', key],
    queryFn: () => {
      if (!key) return null;
      if (key.startsWith('http')) return key;
      return StorageService.getSignedUrl(key);
    },
    enabled: !!key,
    staleTime: 1000 * 60 * 45,
    gcTime: 1000 * 60 * 60,
  });
}

