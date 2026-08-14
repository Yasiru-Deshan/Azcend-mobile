import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const MOCK_CURRENT_PLAN: MealPlan = {
  id: 'plan-001',
  name: 'Lean Muscle Builder',
  description: 'A high-protein plan focused on lean muscle gain while keeping overall calories moderate. Emphasizes whole foods and quality macros.',
  targetCalories: 2400,
  targetProtein: 180,
  targetCarbs: 240,
  targetFat: 75,
  isAiGenerated: false,
  createdAt: '2026-06-01T00:00:00Z',
  lastUpdated: '2026-06-20T00:00:00Z',
  meals: [
    {
      id: 'meal-001',
      name: 'Breakfast',
      foods: [
        { id: 'f001', name: 'Rolled Oats', quantity: 100, unit: 'g', calories: 389, protein: 17, carbs: 66, fat: 7 },
        { id: 'f002', name: 'Whole Eggs', quantity: 3, unit: 'pcs', calories: 234, protein: 18, carbs: 2, fat: 16 },
        { id: 'f003', name: 'Banana', quantity: 1, unit: 'pcs', calories: 89, protein: 1, carbs: 23, fat: 0 },
      ],
    },
    {
      id: 'meal-002',
      name: 'Lunch',
      foods: [
        { id: 'f004', name: 'Grilled Chicken Breast', quantity: 200, unit: 'g', calories: 330, protein: 62, carbs: 0, fat: 7 },
        { id: 'f005', name: 'Brown Rice', quantity: 150, unit: 'g', calories: 195, protein: 4, carbs: 41, fat: 2 },
        { id: 'f006', name: 'Broccoli', quantity: 100, unit: 'g', calories: 34, protein: 3, carbs: 7, fat: 0 },
        { id: 'f007', name: 'Olive Oil', quantity: 15, unit: 'ml', calories: 124, protein: 0, carbs: 0, fat: 14 },
      ],
    },
    {
      id: 'meal-003',
      name: 'Snacks',
      foods: [
        { id: 'f008', name: 'Greek Yogurt', quantity: 200, unit: 'g', calories: 120, protein: 17, carbs: 9, fat: 2 },
        { id: 'f009', name: 'Almonds', quantity: 30, unit: 'g', calories: 173, protein: 6, carbs: 6, fat: 15 },
      ],
    },
    {
      id: 'meal-004',
      name: 'Dinner',
      foods: [
        { id: 'f010', name: 'Salmon Fillet', quantity: 180, unit: 'g', calories: 367, protein: 40, carbs: 0, fat: 22 },
        { id: 'f011', name: 'Sweet Potato', quantity: 200, unit: 'g', calories: 172, protein: 3, carbs: 40, fat: 0 },
        { id: 'f012', name: 'Mixed Greens Salad', quantity: 100, unit: 'g', calories: 25, protein: 2, carbs: 4, fat: 0 },
      ],
    },
  ],
};

const MOCK_PREVIOUS_PLANS: MealPlan[] = [
  {
    id: 'plan-002',
    name: 'Fat Loss Phase',
    description: 'A caloric deficit plan designed to shed body fat while preserving lean muscle mass.',
    targetCalories: 1900,
    targetProtein: 160,
    targetCarbs: 175,
    targetFat: 60,
    isAiGenerated: true,
    createdAt: '2026-04-01T00:00:00Z',
    lastUpdated: '2026-05-25T00:00:00Z',
    meals: [
      {
        id: 'pm-001',
        name: 'Breakfast',
        foods: [
          { id: 'pf001', name: 'Egg Whites', quantity: 200, unit: 'g', calories: 104, protein: 22, carbs: 1, fat: 0 },
          { id: 'pf002', name: 'Whole Wheat Toast', quantity: 60, unit: 'g', calories: 159, protein: 6, carbs: 30, fat: 2 },
        ],
      },
      {
        id: 'pm-002',
        name: 'Lunch',
        foods: [
          { id: 'pf003', name: 'Turkey Breast', quantity: 180, unit: 'g', calories: 207, protein: 44, carbs: 0, fat: 3 },
          { id: 'pf004', name: 'Quinoa', quantity: 120, unit: 'g', calories: 185, protein: 7, carbs: 34, fat: 3 },
        ],
      },
      {
        id: 'pm-003',
        name: 'Dinner',
        foods: [
          { id: 'pf005', name: 'Tuna (canned)', quantity: 150, unit: 'g', calories: 157, protein: 35, carbs: 0, fat: 1 },
          { id: 'pf006', name: 'Mixed Vegetables', quantity: 200, unit: 'g', calories: 70, protein: 4, carbs: 14, fat: 0 },
        ],
      },
    ],
  },
  {
    id: 'plan-003',
    name: 'Maintenance & Performance',
    description: 'Balanced macros to maintain current physique and fuel high-intensity training sessions.',
    targetCalories: 2200,
    targetProtein: 150,
    targetCarbs: 250,
    targetFat: 70,
    isAiGenerated: false,
    createdAt: '2026-02-01T00:00:00Z',
    lastUpdated: '2026-03-28T00:00:00Z',
    meals: [
      {
        id: 'pm-011',
        name: 'Breakfast',
        foods: [
          { id: 'pf011', name: 'Overnight Oats', quantity: 150, unit: 'g', calories: 220, protein: 10, carbs: 38, fat: 4 },
          { id: 'pf012', name: 'Protein Shake', quantity: 1, unit: 'scoop', calories: 120, protein: 25, carbs: 3, fat: 2 },
        ],
      },
      {
        id: 'pm-012',
        name: 'Lunch',
        foods: [
          { id: 'pf013', name: 'Beef Steak', quantity: 180, unit: 'g', calories: 360, protein: 47, carbs: 0, fat: 18 },
          { id: 'pf014', name: 'Pasta', quantity: 100, unit: 'g', calories: 371, protein: 13, carbs: 74, fat: 2 },
        ],
      },
    ],
  },
  {
    id: 'plan-004',
    name: 'Beginner Clean Eating',
    description: 'Simple, clean meals to build healthy eating habits from the ground up.',
    targetCalories: 2000,
    targetProtein: 120,
    targetCarbs: 220,
    targetFat: 65,
    isAiGenerated: false,
    createdAt: '2026-01-05T00:00:00Z',
    lastUpdated: '2026-01-31T00:00:00Z',
    meals: [
      {
        id: 'pm-021',
        name: 'Breakfast',
        foods: [
          { id: 'pf021', name: 'Scrambled Eggs', quantity: 3, unit: 'pcs', calories: 210, protein: 18, carbs: 2, fat: 14 },
        ],
      },
    ],
  },
];

interface MealState {
  currentPlan: MealPlan | null;
  historyPlans: MealPlan[];
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      currentPlan: MOCK_CURRENT_PLAN,
      historyPlans: MOCK_PREVIOUS_PLANS,
    }),
    {
      name: 'ascend-meal-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentPlan: state.currentPlan,
        historyPlans: state.historyPlans,
      }),
    }
  )
);
