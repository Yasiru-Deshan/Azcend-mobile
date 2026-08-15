import { apiRequest } from './api';

export async function fetchCurrentWorkoutTemplateApi(token: string, clientId: string) {
  return apiRequest<any>(`/workouts/client/${clientId}/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAssignedWorkoutTemplatesApi(token: string, clientId: string) {
  return apiRequest<any[]>(`/workouts/client/${clientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
