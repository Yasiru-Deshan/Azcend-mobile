import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { makePersistStorage } from './storage';
import { fetchAssignedWorkoutTemplatesApi, fetchCurrentWorkoutTemplateApi } from '../services/workout.service';
import { useAuthStore } from './auth.store';

export interface SetLog {
  weight: string;
  reps: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  weightMode: 'HWLR' | 'LWHR';
  instructions: string;
  videoUrl: string;
  imageUrl: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutTemplate {
  id: string;
  goalId: string;
  name: string;
  description?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  days: WorkoutDay[];
}

interface WorkoutState {
  currentTemplate: WorkoutTemplate | null;
  historyTemplates: WorkoutTemplate[];

  activeTemplateId: string | null;
  activeDayId: string | null;
  activeExercisesState: Record<string, SetLog[]>;
  activeExercisesCompleted: Record<string, boolean>;
  workoutStarted: boolean;
  workoutCompleted: boolean;
  startTime: number | null;
  endTime: number | null;

  completedWorkoutsCount: number;
  spentMinutesCount: number;

  isLoading: boolean;
  error: string | null;

  startDayWorkout: (templateId: string, dayId: string) => void;
  updateSet: (exerciseId: string, setIndex: number, weight: string, reps: string) => void;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
  completeExercise: (exerciseId: string) => void;
  finishWorkout: () => void;
  resetWorkoutState: () => void;
  fetchWorkouts: () => Promise<void>;
}



export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentTemplate: null,
      historyTemplates: [],

      activeTemplateId: null,
      activeDayId: null,
      activeExercisesState: {},
      activeExercisesCompleted: {},
      workoutStarted: false,
      workoutCompleted: false,
      startTime: null,
      endTime: null,

      completedWorkoutsCount: 3,
      spentMinutesCount: 150,

      isLoading: false,
      error: null,

      startDayWorkout: (templateId, dayId) => {
        const { currentTemplate, historyTemplates } = get();
        let targetTemplate: WorkoutTemplate | undefined;

        if (currentTemplate?.id === templateId) {
          targetTemplate = currentTemplate;
        } else {
          targetTemplate = historyTemplates.find((t) => t.id === templateId);
        }

        if (!targetTemplate) return;
        const targetDay = targetTemplate.days.find((d) => d.id === dayId);
        if (!targetDay) return;

        const initialStates: Record<string, SetLog[]> = {};
        const initialCompletions: Record<string, boolean> = {};

        targetDay.exercises.forEach((ex) => {
          initialStates[ex.id] = Array.from({ length: ex.sets }, () => ({
            weight: '',
            reps: '',
            completed: false,
          }));
          initialCompletions[ex.id] = false;
        });

        set({
          activeTemplateId: templateId,
          activeDayId: dayId,
          activeExercisesState: initialStates,
          activeExercisesCompleted: initialCompletions,
          workoutStarted: true,
          workoutCompleted: false,
          startTime: Date.now(),
          endTime: null,
        });
      },

      updateSet: (exerciseId, setIndex, weight, reps) => {
        set((state) => {
          const sets = state.activeExercisesState[exerciseId] || [];
          const updatedSets = sets.map((s, idx) => {
            if (idx !== setIndex) return s;
            return { ...s, weight, reps };
          });
          return {
            activeExercisesState: {
              ...state.activeExercisesState,
              [exerciseId]: updatedSets,
            },
          };
        });
      },

      toggleSetCompleted: (exerciseId, setIndex) => {
        set((state) => {
          const sets = state.activeExercisesState[exerciseId] || [];
          const updatedSets = sets.map((s, idx) => {
            if (idx !== setIndex) return s;
            return { ...s, completed: !s.completed };
          });
          return {
            activeExercisesState: {
              ...state.activeExercisesState,
              [exerciseId]: updatedSets,
            },
          };
        });
      },

      completeExercise: (exerciseId) => {
        set((state) => ({
          activeExercisesCompleted: {
            ...state.activeExercisesCompleted,
            [exerciseId]: true,
          },
        }));
      },

      finishWorkout: () => {
        const { startTime } = get();
        const endTime = Date.now();
        const start = startTime || endTime;
        const totalMinutesSpent = Math.ceil((endTime - start) / 60000);
        const minutesLogged = totalMinutesSpent > 0 ? totalMinutesSpent : 45;

        set((state) => ({
          workoutStarted: false,
          workoutCompleted: true,
          endTime,
          completedWorkoutsCount: state.completedWorkoutsCount + 1,
          spentMinutesCount: state.spentMinutesCount + minutesLogged,
        }));
      },

      resetWorkoutState: () => {
        set({
          workoutStarted: false,
          workoutCompleted: false,
          activeTemplateId: null,
          activeDayId: null,
          activeExercisesState: {},
          activeExercisesCompleted: {},
          startTime: null,
          endTime: null,
        });
      },

      fetchWorkouts: async () => {
        const { token, user } = useAuthStore.getState();

        if (!token || !user?.id) {
          set({ currentTemplate: null, historyTemplates: [], isLoading: false, error: null });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const [currentRes, historyRes] = await Promise.all([
            fetchCurrentWorkoutTemplateApi(token, user.id),
            fetchAssignedWorkoutTemplatesApi(token, user.id),
          ]);

          const currentTemplate = currentRes.data?.workoutTemplate || null;
          const allAssigned = Array.isArray(historyRes.data) 
            ? historyRes.data.map((assignment: any) => assignment.workoutTemplate).filter(Boolean)
            : [];

          const historyTemplates = currentTemplate
            ? allAssigned.filter((t) => t.id !== currentTemplate.id)
            : allAssigned;

          set({
            currentTemplate,
            historyTemplates,
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          set({
            isLoading: false,
            error: err?.message || 'Failed to connect to workout service',
          });
        }
      },
    }),
    {
      name: 'ascend-workout-v3-storage',
      storage: makePersistStorage<WorkoutState>(),
      partialize: (state) => ({
        currentTemplate: state.currentTemplate,
        historyTemplates: state.historyTemplates,
        activeTemplateId: state.activeTemplateId,
        activeDayId: state.activeDayId,
        activeExercisesState: state.activeExercisesState,
        activeExercisesCompleted: state.activeExercisesCompleted,
        workoutStarted: state.workoutStarted,
        workoutCompleted: state.workoutCompleted,
        startTime: state.startTime,
        endTime: state.endTime,
        completedWorkoutsCount: state.completedWorkoutsCount,
        spentMinutesCount: state.spentMinutesCount,
      }) as WorkoutState,
    }
  )
);
