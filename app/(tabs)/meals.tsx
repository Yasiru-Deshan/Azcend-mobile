import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, UtensilsCrossed } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useMealStore } from '@/src/store/meal.store';
import { Colors, Spacing, Typography, Radius } from '@/constants/theme';

import { ScreenHeader } from '@/src/components/ScreenHeader';
import { PlanInfoHeader } from '@/src/features/meals/components/PlanInfoHeader';
import { NutritionTargetsGrid } from '@/src/features/meals/components/NutritionTargetsGrid';
import { NutritionProgress } from '@/src/features/meals/components/NutritionProgress';
import { MealCard } from '@/src/features/meals/components/MealCard';

const C = Colors.dark;

export default function MealsTabScreen() {
  const router = useRouter();
  const { currentPlan } = useMealStore();

  if (!currentPlan) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={{ paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl }}>
          <ScreenHeader
            title="Meal Plan"
            rightAction={
              <TouchableOpacity onPress={() => router.push('/meals/history')} activeOpacity={0.7}>
                <View style={styles.historyBtn}>
                  <History size={20} color={C.text} />
                </View>
              </TouchableOpacity>
            }
          />
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <UtensilsCrossed size={32} color={C.primary} />
          </View>
          <Text style={styles.emptyTitle}>No Meal Plan Yet</Text>
          <Text style={styles.emptyText}>
            Your coach hasn't assigned a meal plan yet. Check back soon!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const allFoods = currentPlan.meals.flatMap((m) => m.foods);
  const currentCalories = Math.round(allFoods.reduce((s, f) => s + f.calories, 0));
  const currentProtein = Math.round(allFoods.reduce((s, f) => s + f.protein, 0));
  const currentCarbs = Math.round(allFoods.reduce((s, f) => s + f.carbs, 0));
  const currentFat = Math.round(allFoods.reduce((s, f) => s + f.fat, 0));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Meal Plan"
          rightAction={
            <TouchableOpacity onPress={() => router.push('/meals/history')} activeOpacity={0.7}>
              <View style={styles.historyBtn}>
                <History size={20} color={C.text} />
              </View>
            </TouchableOpacity>
          }
        />

        <PlanInfoHeader
          name={currentPlan.name}
          description={currentPlan.description}
          lastUpdated={currentPlan.lastUpdated}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Targets</Text>
          <NutritionTargetsGrid
            targets={{
              targetCalories: currentPlan.targetCalories,
              targetProtein: currentPlan.targetProtein,
              targetCarbs: currentPlan.targetCarbs,
              targetFat: currentPlan.targetFat,
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Nutrition</Text>
          <NutritionProgress
            currentCalories={currentCalories}
            targetCalories={currentPlan.targetCalories}
            currentProtein={currentProtein}
            targetProtein={currentPlan.targetProtein}
            currentCarbs={currentCarbs}
            targetCarbs={currentPlan.targetCarbs}
            currentFat={currentFat}
            targetFat={currentPlan.targetFat}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meals ({currentPlan.meals.length})</Text>
          <View style={styles.cardStack}>
            {currentPlan.meals.map((meal) => (
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
  
  headerRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.xs },
  screenTitle:   { ...Typography.h1, color: C.text },
  historyBtn:    { width: 40, height: 40, borderRadius: Radius.full, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  
  section:       { gap: Spacing.md },
  sectionTitle:  { ...Typography.section, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardStack:     { gap: Spacing.md },

  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing['2xl'] },
  emptyIconBox: { width: 64, height: 64, borderRadius: Radius.xl, backgroundColor: C.primaryMuted, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  emptyTitle: { ...Typography.h2, color: C.text, marginBottom: Spacing.sm },
  emptyText: { ...Typography.body, color: C.textMuted, textAlign: 'center' },
});
