import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchAssignedMealPlansApi, fetchCurrentMealPlanApi } from '../services/meal.service';
import { makePersistStorage } from './storage';
import { useAuthStore } from './auth.store';

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  foods: FoodItem[];
}

export interface MealPlan {
  id: string;
  name: string;
  description?: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  isAiGenerated: boolean;
  createdAt: string;
  lastUpdated: string;
  meals: Meal[];
}

interface MealState {
  currentPlan: MealPlan | null;
  historyPlans: MealPlan[];
  isLoading: boolean;
  error: string | null;
  fetchAssignedPlans: () => Promise<void>;
  resetMealStore: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      currentPlan: null,
      historyPlans: [],
      isLoading: false,
      error: null,

      fetchAssignedPlans: async () => {
        const { token, user } = useAuthStore.getState();

        if (!token || !user?.id) {
          set({ currentPlan: null, historyPlans: [], isLoading: false, error: null });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const [currentRes, historyRes] = await Promise.all([
            fetchCurrentMealPlanApi(token, user.id),
            fetchAssignedMealPlansApi(token, user.id),
          ]);

          const currentPlan = currentRes.data || null;
          const allAssigned = Array.isArray(historyRes.data) ? historyRes.data : [];

          const historyPlans = currentPlan
            ? allAssigned.filter((p) => p.id !== currentPlan.id)
            : allAssigned;

          set({
            currentPlan,
            historyPlans,
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          set({
            isLoading: false,
            error: err?.message || 'Failed to connect to meal plan service',
          });
        }
      },

      resetMealStore: () => {
        set({
          currentPlan: null,
          historyPlans: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'ascend-meal-storage',
      storage: makePersistStorage<MealState>(),
      partialize: (state) => ({
        currentPlan: state.currentPlan,
        historyPlans: state.historyPlans,
      }) as MealState,
    }
  )
);
