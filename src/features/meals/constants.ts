export const MACRO_COLORS = {
  calories: { text: '#8CD400', bg: '#8CD400' }, // brand
  protein:  { text: '#fb7185', bg: '#f43f5e' }, // rose
  carbs:    { text: '#fbbf24', bg: '#f59e0b' }, // amber
  fat:      { text: '#38bdf8', bg: '#0ea5e9' }, // sky
} as const;

export const NUTRITION_CONFIG = [
  {
    key: 'calories' as const,
    label: 'Calories',
    targetField: 'targetCalories' as const,
    unit: 'kcal',
    textColor: MACRO_COLORS.calories.text,
    bgColor: MACRO_COLORS.calories.bg,
  },
  {
    key: 'protein' as const,
    label: 'Protein',
    targetField: 'targetProtein' as const,
    unit: 'g',
    textColor: MACRO_COLORS.protein.text,
    bgColor: MACRO_COLORS.protein.bg,
  },
  {
    key: 'carbs' as const,
    label: 'Carbs',
    targetField: 'targetCarbs' as const,
    unit: 'g',
    textColor: MACRO_COLORS.carbs.text,
    bgColor: MACRO_COLORS.carbs.bg,
  },
  {
    key: 'fat' as const,
    label: 'Fat',
    targetField: 'targetFat' as const,
    unit: 'g',
    textColor: MACRO_COLORS.fat.text,
    bgColor: MACRO_COLORS.fat.bg,
  },
] as const;

export type NutritionKey = (typeof NUTRITION_CONFIG)[number]['key'];
