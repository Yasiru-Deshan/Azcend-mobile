import { Colors, Radius, Spacing } from '@/constants/theme';
import type { Meal } from '@/src/store/meal.store';
import { Utensils } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MACRO_COLORS } from '../constants';
import { FoodItemRow } from './FoodItemRow';
import { MacroBadge } from './MacroBadge';

const C = Colors.dark;

interface MealCardProps {
  meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  const totalCalories = Math.round(meal.foods.reduce((s, f) => s + f.calories, 0));
  const totalProtein = Math.round(meal.foods.reduce((s, f) => s + f.protein, 0));
  const totalCarbs = Math.round(meal.foods.reduce((s, f) => s + f.carbs, 0));
  const totalFat = Math.round(meal.foods.reduce((s, f) => s + f.fat, 0));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Utensils size={18} color={C.text} />
          <Text style={styles.title}>{meal.name}</Text>
        </View>
        <Text style={[styles.headerCalories, { color: MACRO_COLORS.calories.text }]}>
          {totalCalories} kcal
        </Text>
      </View>

      <View style={styles.foodsContainer}>
        {meal.foods.length === 0 ? (
          <Text style={styles.emptyText}>No foods added yet.</Text>
        ) : (
          meal.foods.map((food) => (
            <FoodItemRow key={food.id} food={food} />
          ))
        )}
      </View>

      {meal.foods.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>Meal Totals</Text>
          <MacroBadge protein={totalProtein} carbs={totalCarbs} fat={totalFat} showUnit />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: C.text,
  },
  headerCalories: {
    fontSize: 14,
    fontWeight: '600',
  },
  foodsContainer: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: C.textMuted,
    fontSize: 14,
    paddingVertical: Spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: C.textMuted,
  },
});
