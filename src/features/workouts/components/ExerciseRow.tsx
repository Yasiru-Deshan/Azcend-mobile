import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';

const C = Colors.dark;

interface ExerciseRowProps {
  exercise: Exercise;
  index: number;
}

export const ExerciseRow = ({ exercise, index }: ExerciseRowProps) => {
  return (
    <View style={styles.exerciseRow}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.exerciseMeta}>
          <Text style={styles.metaText}>{exercise.sets} Sets</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{exercise.reps}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={[
            styles.weightMode,
            exercise.weightMode === 'HWLR' ? styles.hwlr : styles.lwhr
          ]}>
            {exercise.weightMode}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseRow:     { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: 'rgba(39,39,42,0.5)', backgroundColor: 'rgba(255,255,255,0.02)' },
  indexBadge:      { width: 28, height: 28, borderRadius: Radius.sm, backgroundColor: C.primaryMuted, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  indexText:       { fontSize: 12, fontWeight: '700', color: C.primary },
  exerciseInfo:    { gap: 3 },
  exerciseName:    { fontSize: 13, fontWeight: '600', color: C.text },
  exerciseMeta:    { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText:        { fontSize: 10, fontWeight: '600', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  metaDot:         { fontSize: 10, color: C.textSubtle },
  weightMode:      { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  hwlr:            { color: '#f59e0b' },
  lwhr:            { color: '#06b6d4' },
});
