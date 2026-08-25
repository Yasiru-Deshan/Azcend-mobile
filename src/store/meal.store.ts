

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


