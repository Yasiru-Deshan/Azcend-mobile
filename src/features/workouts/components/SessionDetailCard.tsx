import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { WorkoutDay } from '@/src/store/workout.store';

const C = Colors.dark;

interface SessionDetailCardProps {
  activeDay: WorkoutDay;
  totalExercisesCount: number;
}

export const SessionDetailCard = ({ activeDay, totalExercisesCount }: SessionDetailCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{activeDay.name}</Text>
      <Text style={styles.subtitle}>
        Tracking {totalExercisesCount} exercises. Mark sets completed in details page to save progress.
      </Text>
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
    marginBottom: Spacing.xl,
    elevation: 2,
  },
  title: {
    ...Typography.h3,
    color: C.text,
  },
  subtitle: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
});
