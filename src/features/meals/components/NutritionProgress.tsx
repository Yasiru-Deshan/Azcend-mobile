import { Colors, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NUTRITION_CONFIG } from '../constants';

const C = Colors.dark;

interface NutritionProgressProps {
  currentCalories: number;
  currentProtein: number;
  currentCarbs: number;
  currentFat: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

const ProgressBar = ({ label, current, target, unit, bgColor }: any) => {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const onTarget = pct >= 90 && pct <= 110;
  const activeColor = onTarget ? C.success : bgColor;
  const valueColor = onTarget ? C.successFg : C.text;

  return (
    <View style={styles.barContainer}>
      <View style={styles.barHeader}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValueText}>
          <Text style={{ color: valueColor, fontWeight: '700' }}>{current}</Text>
          {' / '}{target} {unit}
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: activeColor }]} />
      </View>
    </View>
  );
};

export const NutritionProgress = (props: NutritionProgressProps) => {
  const currentMap: Record<string, number> = {
    calories: props.currentCalories,
    protein: props.currentProtein,
    carbs: props.currentCarbs,
    fat: props.currentFat,
  };
  const targetMap: Record<string, number> = {
    calories: props.targetCalories,
    protein: props.targetProtein,
    carbs: props.targetCarbs,
    fat: props.targetFat,
  };

  return (
    <View style={styles.container}>
      {NUTRITION_CONFIG.map(({ key, label, unit, bgColor }) => (
        <ProgressBar
          key={key}
          label={label}
          current={currentMap[key]}
          target={targetMap[key]}
          unit={unit}
          bgColor={bgColor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  barContainer: {
    gap: Spacing.sm,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: C.text,
  },
  barValueText: {
    fontSize: 14,
    color: C.textMuted,
  },
  barTrack: {
    height: 8,
    backgroundColor: C.divider,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
