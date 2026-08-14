import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { Exercise, SetLog } from '@/src/store/workout.store';
import { Check } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const C = Colors.dark;

interface ExerciseSetLoggerProps {
  exercise: Exercise;
  sets: SetLog[];
  updateSet: (exerciseId: string, setIndex: number, weight: string, reps: string) => void;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
}

export const ExerciseSetLogger = ({
  exercise,
  sets,
  updateSet,
  toggleSetCompleted,
}: ExerciseSetLoggerProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Log Exercise Sets</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.colLabel, styles.colSet]}>SET</Text>
        <Text style={[styles.colLabel, styles.colTarget]}>TARGET</Text>
        <Text style={[styles.colLabel, styles.colInput]}>LBS</Text>
        <Text style={[styles.colLabel, styles.colInput]}>REPS</Text>
        <Text style={[styles.colLabel, styles.colCheck]}>✓</Text>
      </View>

      <View style={styles.rows}>
        {sets.map((set, index) => (
          <View
            key={index}
            style={[styles.setRow, set.completed && styles.setRowDone]}
          >
            <Text style={[styles.setNum, set.completed && styles.setNumDone, styles.colSet]}>
              {index + 1}
            </Text>

            <Text style={[styles.target, styles.colTarget]} numberOfLines={1}>
              {exercise.reps}
            </Text>

            <TextInput
              style={[styles.input, styles.colInput, set.completed && styles.inputDone]}
              placeholder="--"
              placeholderTextColor={C.textSubtle}
              value={set.weight}
              editable={!set.completed}
              keyboardType="decimal-pad"
              onChangeText={(val) => updateSet(exercise.id, index, val, set.reps)}
            />

            <TextInput
              style={[styles.input, styles.colInput, set.completed && styles.inputDone]}
              placeholder="--"
              placeholderTextColor={C.textSubtle}
              value={set.reps}
              editable={!set.completed}
              keyboardType="number-pad"
              onChangeText={(val) => updateSet(exercise.id, index, set.weight, val)}
            />

            <View style={[styles.colCheck, { alignItems: 'center' }]}>
              <TouchableOpacity
                style={[styles.checkBtn, set.completed && styles.checkBtnDone]}
                onPress={() => toggleSetCompleted(exercise.id, index)}
                disabled={!set.weight && !set.reps}
                activeOpacity={0.8}
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  color={set.completed ? C.primaryFg : C.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: 18, gap: Spacing.md, elevation: 3 },
  heading: { ...Typography.section, color: C.text },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  colLabel: { fontSize: 10, fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' },
  rows: { gap: Spacing.sm },

  colSet: { width: 36, textAlign: 'center' },
  colTarget: { flex: 1, textAlign: 'left', paddingLeft: 4 },
  colInput: { width: 64, textAlign: 'center' },
  colCheck: { width: 40, textAlign: 'center' },

  setRow: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: Radius.md, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: 'rgba(255,255,255,0.02)' },
  setRowDone: { backgroundColor: 'rgba(140,212,0,0.05)', borderColor: 'rgba(140,212,0,0.2)' },
  setNum: { fontSize: 14, fontWeight: '700', color: C.textMuted },
  setNumDone: { color: C.primary },
  target: { fontSize: 12, color: C.textMuted, fontWeight: '500' },

  input: {
    height: 34,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.surface,
    color: C.text,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  inputDone: { opacity: 0.5 },

  checkBtn: { width: 32, height: 32, borderRadius: Radius.sm, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  checkBtnDone: { backgroundColor: C.primary, borderColor: C.primary },
});
