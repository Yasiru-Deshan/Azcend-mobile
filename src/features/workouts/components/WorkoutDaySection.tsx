import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { WorkoutDay } from '@/src/store/workout.store';
import { ChevronDown, ChevronUp, Play } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExerciseRow } from './ExerciseRow';
const C = Colors.dark;

interface WorkoutDaySectionProps {
  day: WorkoutDay;
  onStartWorkout?: () => void;
  defaultExpanded?: boolean;
}

export const WorkoutDaySection = ({
  day,
  onStartWorkout,
  defaultExpanded = false,
}: WorkoutDaySectionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.75}
      >
        <View style={styles.headerText}>
          <Text style={styles.dayName}>{day.name}</Text>
          <Text style={styles.exerciseCount}>
            {day.exercises.length} {day.exercises.length === 1 ? 'exercise' : 'exercises'}
          </Text>
        </View>
        {expanded
          ? <ChevronUp size={16} color={C.textMuted} />
          : <ChevronDown size={16} color={C.textMuted} />
        }
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />

          <View style={styles.exerciseList}>
            {day.exercises.map((ex, index) => (
              <ExerciseRow key={ex.id} exercise={ex} index={index} />
            ))}
          </View>

          {onStartWorkout && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={onStartWorkout}
              activeOpacity={0.85}
            >
              <Play size={16} color={C.primaryFg} fill={C.primaryFg} />
              <Text style={styles.startButtonText}>Start Day Routine</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, overflow: 'hidden', elevation: 2 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg },
  headerText: { gap: 2, flex: 1, paddingRight: Spacing.md },
  dayName: { fontSize: 15, fontWeight: '700', color: C.text },
  exerciseCount: { fontSize: 12, color: C.textMuted, fontWeight: '500' },
  expandedContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
  divider: { height: 1, backgroundColor: C.divider, marginBottom: Spacing.lg },
  exerciseList: { gap: Spacing.sm },
  startButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: C.primary, borderRadius: Radius.full, paddingVertical: 16, paddingHorizontal: Spacing.xl, marginTop: Spacing.lg },
  startButtonText: { fontSize: 16, fontWeight: '700', color: C.primaryFg },
});
