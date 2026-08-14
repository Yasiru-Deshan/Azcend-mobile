import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { NUTRITION_CONFIG } from '../constants';
import type { MealPlan } from '@/src/store/meal.store';

const C = Colors.dark;

type NutritionTargets = Pick<
  MealPlan,
  'targetCalories' | 'targetProtein' | 'targetCarbs' | 'targetFat'
>;

interface NutritionTargetsGridProps {
  targets: NutritionTargets;
}

export const NutritionTargetsGrid = ({ targets }: NutritionTargetsGridProps) => {
  return (
    <View style={styles.grid}>
      {NUTRITION_CONFIG.map(({ key, label, targetField, unit, textColor }) => (
        <View key={key} style={styles.card}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.value, { color: textColor }]}>
              {targets[targetField]}
            </Text>
            <Text style={styles.unit}>{unit}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: Spacing.lg,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  unit: {
    fontSize: 14,
    color: C.textMuted,
  },
});
