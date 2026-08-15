import { apiRequest } from './api';
import type { MealPlan } from '../store/meal.store';

export async function fetchCurrentMealPlanApi(token: string, clientId: string) {
  return apiRequest<MealPlan>(`/meal-plans/client/${clientId}/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAssignedMealPlansApi(token: string, clientId: string) {
  return apiRequest<MealPlan[]>(`/meal-plans/client/${clientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
