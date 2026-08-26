import type { WorkoutTemplate } from '../store/workout.store';
import { apiRequest } from './api';

export interface WorkoutResponse {
  workoutTemplate: WorkoutTemplate;
  currentWorkoutDayId?: string;
}

export async function fetchCurrentWorkoutTemplateApi(token: string, clientId: string) {
  return apiRequest<WorkoutResponse>(`/workouts/client/${clientId}/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAssignedWorkoutTemplatesApi(token: string, clientId: string) {
  return apiRequest<WorkoutResponse[]>(`/workouts/client/${clientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
