import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { MACRO_COLORS } from '../constants';
import type { FoodItem } from '@/src/store/meal.store';

const C = Colors.dark;

interface FoodItemRowProps {
  food: FoodItem;
}

export const FoodItemRow = ({ food }: FoodItemRowProps) => {
  const macros = [
    { label: 'Cal', value: food.calories, color: MACRO_COLORS.calories.text, unit: '' },
    { label: 'Pro', value: food.protein, color: MACRO_COLORS.protein.text, unit: 'g' },
    { label: 'Carb', value: food.carbs, color: MACRO_COLORS.carbs.text, unit: 'g' },
    { label: 'Fat', value: food.fat, color: MACRO_COLORS.fat.text, unit: 'g' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
        <Text style={styles.quantity}>{food.quantity} {food.unit}</Text>
      </View>
      
      <View style={styles.right}>
        {macros.map(({ label, value, color, unit }) => (
          <View key={label} style={styles.macroBlock}>
            <Text style={styles.macroLabel}>{label}</Text>
            <Text style={[styles.macroValue, { color }]}>
              {value}{unit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  left: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 12,
    color: C.textMuted,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  macroBlock: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});
