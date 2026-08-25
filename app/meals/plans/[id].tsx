import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { useMealPlansQuery } from '@/src/hooks/useMealPlansQuery';
import { Colors, Spacing, Typography } from '@/constants/theme';

import { PlanInfoHeader } from '@/src/features/meals/components/PlanInfoHeader';
import { NutritionTargetsGrid } from '@/src/features/meals/components/NutritionTargetsGrid';
import { NutritionProgress } from '@/src/features/meals/components/NutritionProgress';
import { MealCard } from '@/src/features/meals/components/MealCard';

const C = Colors.dark;

export default function MealPlanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useMealPlansQuery();
  const currentPlan = data?.currentPlan;
  const historyPlans = data?.historyPlans || [];

  const plan =
    currentPlan?.id === id
      ? currentPlan
      : historyPlans.find((p) => p.id === id);

  if (!plan) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Plan Not Found</Text>
      </View>
    );
  }

  const allFoods = plan.meals.flatMap((m) => m.foods);
  const currentCalories = Math.round(allFoods.reduce((s, f) => s + f.calories, 0));
  const currentProtein = Math.round(allFoods.reduce((s, f) => s + f.protein, 0));
  const currentCarbs = Math.round(allFoods.reduce((s, f) => s + f.carbs, 0));
  const currentFat = Math.round(allFoods.reduce((s, f) => s + f.fat, 0));

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PlanInfoHeader
          name={plan.name}
          description={plan.description}
          lastUpdated={plan.lastUpdated}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Targets</Text>
          <NutritionTargetsGrid
            targets={{
              targetCalories: plan.targetCalories,
              targetProtein: plan.targetProtein,
              targetCarbs: plan.targetCarbs,
              targetFat: plan.targetFat,
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Nutrition</Text>
          <NutritionProgress
            currentCalories={currentCalories}
            targetCalories={plan.targetCalories}
            currentProtein={currentProtein}
            targetProtein={plan.targetProtein}
            currentCarbs={currentCarbs}
            targetCarbs={plan.targetCarbs}
            currentFat={currentFat}
            targetFat={plan.targetFat}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meals ({plan.meals.length})</Text>
          <View style={styles.cardStack}>
            {plan.meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll:   { flex: 1, backgroundColor: C.background },
  content:  { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['4xl'], gap: Spacing['2xl'] },
  
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.background },
  errorText:       { ...Typography.h2, color: C.text },

  section:       { gap: Spacing.md },
  sectionTitle:  { ...Typography.section, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardStack:     { gap: Spacing.md },
});
