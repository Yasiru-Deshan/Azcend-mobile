import { apiRequest } from './api';
import type { CheckinProgressData } from '../features/profile/types';

export async function fetchClientCheckinsApi(clientId: string, token: string) {
  const res = await apiRequest<any[]>(`/checkin/client/${clientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.data) {
    const mapped: CheckinProgressData[] = res.data.map((item: any) => {
      const data: CheckinProgressData = {
        id: item.id,
        date: item.timestamp ? item.timestamp.split('T')[0] : new Date().toISOString().split('T')[0],
        photos: item.checkin?.photos,
        feedback: item.feedback || item.checkin?.feedback,
        questions: item.checkin?.questions,
      };

      if (item.checkin?.measurements && Array.isArray(item.checkin.measurements)) {
        item.checkin.measurements.forEach((m: any) => {
          (data as any)[m.label] = m.value;
        });
      }
      return data;
    });
    return { ...res, data: mapped };
  }
  
  return res as { error?: string; status: number; data?: CheckinProgressData[] };
}
