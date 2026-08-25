import { useQuery } from '@tanstack/react-query';
import { fetchAssignedWorkoutTemplatesApi, fetchCurrentWorkoutTemplateApi } from '../services/workout.service';
import { useAuthStore } from '../store/auth.store';
import type { WorkoutTemplate } from '../store/workout.store';

export function useWorkoutsQuery() {
  const { token, user } = useAuthStore();

  return useQuery({
    queryKey: ['workouts', user?.id],
    queryFn: async () => {
      if (!token || !user?.id) return { currentTemplate: null, historyTemplates: [] };

      const [currentRes, historyRes] = await Promise.all([
        fetchCurrentWorkoutTemplateApi(token, user.id),
        fetchAssignedWorkoutTemplatesApi(token, user.id),
      ]);

      const currentTemplate: WorkoutTemplate | null = currentRes.data?.workoutTemplate || null;
      const allAssigned: WorkoutTemplate[] = Array.isArray(historyRes.data)
        ? historyRes.data.map((assignment: any) => assignment.workoutTemplate).filter(Boolean)
        : [];

      const historyTemplates = currentTemplate
        ? allAssigned.filter((t) => t.id !== currentTemplate.id)
        : allAssigned;

      return {
        currentTemplate,
        historyTemplates,
      };
    },
    enabled: !!token && !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}
