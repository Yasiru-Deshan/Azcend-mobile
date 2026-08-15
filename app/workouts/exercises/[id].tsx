import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useWorkoutStore } from '@/src/store/workout.store';
import { ExerciseStatsGrid } from '@/src/features/workouts/components/ExerciseStatsGrid';
import { ExerciseMediaCard } from '@/src/features/workouts/components/ExerciseMediaCard';
import { ExerciseInstructions } from '@/src/features/workouts/components/ExerciseInstructions';
import { ExerciseSetLogger } from '@/src/features/workouts/components/ExerciseSetLogger';

const C = Colors.dark;

export default function ActiveExerciseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    currentTemplate,
    historyTemplates,
    activeTemplateId,
    activeDayId,
    activeExercisesState,
    workoutStarted,
    updateSet,
    toggleSetCompleted,
    completeExercise,
  } = useWorkoutStore();

  const template =
    currentTemplate.id === activeTemplateId
      ? currentTemplate
      : historyTemplates.find((t) => t.id === activeTemplateId);

  const activeDay = template?.days.find((d) => d.id === activeDayId);
  const exercise = activeDay?.exercises.find((ex) => ex.id === id);
  const sets = activeExercisesState[id] || [];

  if (!workoutStarted || !exercise) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Exercise Not Found</Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.replace('/(tabs)/workouts')}
        >
          <Text style={styles.actionBtnText}>Go to Workouts</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleCompleteExercise = () => {
    completeExercise(exercise.id);
    router.back();
  };

  const hasCompletedAnySet = sets.some((s) => s.completed);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color={C.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle} numberOfLines={1}>{exercise.name}</Text>
          <Text style={styles.headerSub}>Active Exercise</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ExerciseStatsGrid exercise={exercise} />
        <ExerciseMediaCard exercise={exercise} />
        <ExerciseInstructions exercise={exercise} />
        
        <ExerciseSetLogger 
          exercise={exercise} 
          sets={sets} 
          updateSet={updateSet} 
          toggleSetCompleted={toggleSetCompleted} 
        />
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.btn, styles.cancelBtn]}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.btn, styles.completeBtn, !hasCompletedAnySet && styles.completeBtnDisabled]}
          onPress={handleCompleteExercise}
          disabled={!hasCompletedAnySet}
          activeOpacity={0.85}
        >
          <Text style={[styles.completeBtnText, !hasCompletedAnySet && styles.completeBtnTextDisabled]}>
            Complete Exercise
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xl, gap: Spacing.lg, paddingBottom: 100 },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    backgroundColor: C.background,
  },
  backBtn: {
    padding: Spacing.sm,
    marginLeft: -Spacing.sm,
    marginRight: Spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
  },
  headerSub: {
    fontSize: 13,
    color: C.textMuted,
  },

  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    backgroundColor: C.background,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: C.text,
  },
  completeBtn: {
    backgroundColor: C.primary,
    flex: 2,
  },
  completeBtnDisabled: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.primaryFg,
  },
  completeBtnTextDisabled: {
    color: C.textMuted,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.background,
  },
  errorText: {
    ...Typography.h2,
    color: C.text,
    marginBottom: 24,
  },
  actionBtn: {
    backgroundColor: C.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },
  actionBtnText: {
    color: C.primaryFg,
    fontWeight: '600',
  },
});
