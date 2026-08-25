import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';

const C = Colors.dark;

interface ExerciseStatsGridProps {
  exercise: Exercise;
}

export const ExerciseStatsGrid = ({ exercise }: ExerciseStatsGridProps) => {
  return (
    <View style={styles.grid}>
      <View style={styles.col}>
        <Text style={styles.label}>SETS</Text>
        <Text style={styles.val}>{exercise.sets}</Text>
      </View>

      <View style={[styles.col, styles.borderLeft]}>
        <Text style={styles.label}>REPS</Text>
        <Text style={styles.val}>{exercise.reps.replace(' reps', '')}</Text>
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
  borderLeft: {
    borderLeftWidth: 1,
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
});

