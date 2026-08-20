import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Info } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';

const C = Colors.dark;

interface ExerciseInstructionsProps {
  exercise: Exercise;
}

export const ExerciseInstructions = ({ exercise }: ExerciseInstructionsProps) => {
  if (!exercise.instructions) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Info size={16} color={C.primary} />
        <Text style={styles.title}>Instructions</Text>
      </View>
      <Text style={styles.instructions}>{exercise.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.card,
    padding: Spacing.xl,
    elevation: 2,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  instructions: {
    fontSize: 14,
    color: C.textMuted,
    lineHeight: 22,
  },
});
