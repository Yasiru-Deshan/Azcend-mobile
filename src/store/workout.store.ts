import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  currentTemplate: WorkoutTemplate;
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

  startDayWorkout: (templateId: string, dayId: string) => void;
  updateSet: (exerciseId: string, setIndex: number, weight: string, reps: string) => void;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
  completeExercise: (exerciseId: string) => void;
  finishWorkout: () => void;
  resetWorkoutState: () => void;
}

const MOCK_CURRENT_TEMPLATE: WorkoutTemplate = {
  id: 'lean-muscle-builder',
  goalId: 'muscle-gain',
  name: 'Lean Muscle Builder',
  description: 'A comprehensive hypertrophy program focused on lean muscle gain while keeping overall body fat low.',
  difficulty: 'Intermediate',
  durationMinutes: 50,
  days: [
    {
      id: 'day-1',
      name: 'Day 1: Chest & Triceps',
      exercises: [
        {
          id: 'bench-press',
          name: 'Flat Barbell Bench Press',
          sets: 4,
          reps: '8-10 reps',
          restSeconds: 90,
          weightMode: 'HWLR',
          instructions: 'Lie flat on a bench. Grip the barbell slightly wider than shoulder-width.',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-with-barbell-bench-press-40242-large.mp4',
          imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'day-2',
      name: 'Day 2: Back & Biceps',
      exercises: [
        {
          id: 'lat-pulldown',
          name: 'Lat Pulldown',
          sets: 3,
          reps: '10-12 reps',
          restSeconds: 60,
          weightMode: 'LWHR',
          instructions: 'Sit at a pulldown machine and adjust the knee pad.',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-a-fitness-center-40234-large.mp4',
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
        },
      ],
    },
  ],
};

const MOCK_HISTORY_TEMPLATES: WorkoutTemplate[] = [];

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentTemplate: MOCK_CURRENT_TEMPLATE,
      historyTemplates: MOCK_HISTORY_TEMPLATES,

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

      startDayWorkout: (templateId, dayId) => {
        const { currentTemplate, historyTemplates } = get();
        let targetTemplate: WorkoutTemplate | undefined;

        if (currentTemplate.id === templateId) {
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
    }),
    {
      name: 'ascend-workout-v2-storage',
      storage: createJSONStorage(() => AsyncStorage),
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
      }),
    }
  )
);
