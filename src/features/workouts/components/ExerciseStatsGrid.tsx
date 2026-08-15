import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';

const C = Colors.dark;

interface ExerciseStatsGridProps {
  exercise: Exercise;
}

export const ExerciseStatsGrid = ({ exercise }: ExerciseStatsGridProps) => {
  const isHwlr = exercise.weightMode === 'HWLR';

  return (
    <View style={styles.grid}>
      <View style={styles.col}>
        <Text style={styles.label}>SETS</Text>
        <Text style={styles.val}>{exercise.sets}</Text>
      </View>

      <View style={[styles.col, styles.borderSides]}>
        <Text style={styles.label}>REPS</Text>
        <Text style={styles.val}>{exercise.reps.replace(' reps', '')}</Text>
      </View>

      <View style={styles.col}>
        <Text style={styles.label}>MODE</Text>
        <View style={[styles.modeChip, isHwlr ? styles.hwlrChip : styles.lwhrChip]}>
          <Text style={[styles.modeText, isHwlr ? styles.hwlrText : styles.lwhrText]}>
            {exercise.weightMode}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.card,
    paddingVertical: Spacing.md,
    elevation: 2,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  borderSides: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: C.cardBorder,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  val: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text,
  },
  modeChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  modeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hwlrChip: { backgroundColor: 'rgba(245,158,11,0.1)' },
  lwhrChip: { backgroundColor: 'rgba(6,182,212,0.1)' },
  hwlrText: { color: '#f59e0b' },
  lwhrText: { color: '#06b6d4' },
});
