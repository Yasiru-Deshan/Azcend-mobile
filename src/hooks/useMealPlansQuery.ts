import { useQuery } from '@tanstack/react-query';
import { fetchAssignedMealPlansApi, fetchCurrentMealPlanApi } from '../services/meal.service';
import { useAuthStore } from '../store/auth.store';
import type { MealPlan } from '../store/meal.store';

export function useMealPlansQuery() {
  const { token, user } = useAuthStore();

  return useQuery({
    queryKey: ['mealPlans', user?.id],
    queryFn: async () => {
      if (!token || !user?.id) return { currentPlan: null, historyPlans: [] };

      const [currentRes, historyRes] = await Promise.all([
        fetchCurrentMealPlanApi(token, user.id),
        fetchAssignedMealPlansApi(token, user.id),
      ]);

      const currentPlan: MealPlan | null = currentRes.data || null;
      const allAssigned: MealPlan[] = Array.isArray(historyRes.data) ? historyRes.data : [];

      const historyPlans = currentPlan
        ? allAssigned.filter((p) => p.id !== currentPlan.id)
        : allAssigned;

      return {
        currentPlan,
        historyPlans,
      };
    },
    enabled: !!token && !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}
