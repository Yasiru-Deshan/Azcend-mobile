import { Colors, Radius, Spacing } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';
import { Check, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = Colors.dark;

interface SessionExerciseItemProps {
  exercise: Exercise;
  status: 'completed' | 'in-progress' | 'not-started';
  onPress: () => void;
}

export const SessionExerciseItem = ({ exercise, status, onPress }: SessionExerciseItemProps) => {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.thumbWrapper}>
        <Image
          source={{ uri: exercise.imageUrl }}
          style={[styles.thumb, isCompleted && styles.thumbDim]}
        />
        {isCompleted && (
          <View style={styles.checkOverlay}>
            <Check size={18} color={C.primary} strokeWidth={3} />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.name, isCompleted && styles.nameCompleted]}
          numberOfLines={1}
        >
          {exercise.name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipText}>{exercise.sets} Sets</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipText}>{exercise.reps.replace(' reps', '')} Reps</Text>
          </View>
          <View style={[
            styles.metaChip,
            exercise.weightMode === 'HWLR' ? styles.hwlrChip : styles.lwhrChip,
          ]}>
            <Text style={[
              styles.metaChipText,
              exercise.weightMode === 'HWLR' ? styles.hwlrText : styles.lwhrText,
            ]}>
              {exercise.weightMode}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionGroup}>
        {isCompleted ? (
          <View style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </View>
        ) : isInProgress ? (
          <View style={styles.resumeBtn}>
            <Text style={styles.resumeBtnText}>Resume</Text>
          </View>
        ) : (
          <View style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start</Text>
          </View>
        )}
        <ChevronRight size={16} color={C.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: Radius.md, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, gap: Spacing.md },
  cardCompleted: { borderColor: 'rgba(140,212,0,0.25)' },
  thumbWrapper: { width: 44, height: 44, borderRadius: Radius.sm, overflow: 'hidden', backgroundColor: C.surface, flexShrink: 0, position: 'relative' },
  thumb: { width: '100%', height: '100%' },
  thumbDim: { opacity: 0.4 },
  checkOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(140,212,0,0.2)', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 5 },
  name: { fontSize: 13, fontWeight: '600', color: C.text },
  nameCompleted: { color: C.textSubtle, textDecorationLine: 'line-through' },
  metaRow: { flexDirection: 'row', gap: 5, flexWrap: 'wrap' },
  metaChip: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: C.surface },
  metaChipText: { fontSize: 9, fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  hwlrChip: { backgroundColor: 'rgba(245,158,11,0.1)' },
  lwhrChip: { backgroundColor: 'rgba(6,182,212,0.1)' },
  hwlrText: { color: '#f59e0b' },
  lwhrText: { color: '#06b6d4' },
  actionGroup: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  startBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, backgroundColor: C.primary },
  startBtnText: { fontSize: 11, fontWeight: '700', color: C.primaryFg },
  resumeBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, backgroundColor: C.primaryMuted, borderWidth: 1, borderColor: C.primaryBorder },
  resumeBtnText: { fontSize: 11, fontWeight: '700', color: C.primary },
  editBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, borderWidth: 1, borderColor: C.cardBorder },
  editBtnText: { fontSize: 11, fontWeight: '600', color: C.textMuted },
});
