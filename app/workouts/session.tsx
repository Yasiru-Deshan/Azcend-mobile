import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Trophy, Timer, ChevronLeft } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useWorkoutStore } from '@/src/store/workout.store';
import { SessionDetailCard } from '@/src/features/workouts/components/SessionDetailCard';
import { SessionExerciseItem } from '@/src/features/workouts/components/SessionExerciseItem';
import { CelebrationModal } from '@/src/features/workouts/components/CelebrationModal';
import { useWorkoutsQuery } from '@/src/hooks/useWorkoutsQuery';

const C = Colors.dark;

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [elapsed, setElapsed] = useState('0:00');

  const {
    activeTemplateId,
    activeDayId,
    activeExercisesState,
    activeExercisesCompleted,
    workoutStarted,
    workoutCompleted,
    startTime,
    finishWorkout,
    resetWorkoutState,
  } = useWorkoutStore();

  const { data } = useWorkoutsQuery();
  const currentTemplate = data?.currentTemplate;
  const historyTemplates = data?.historyTemplates || [];

  useEffect(() => {
    if (workoutCompleted && !workoutStarted) {
      setShowCelebration(true);
    }
  }, [workoutCompleted, workoutStarted]);

  useEffect(() => {
    const tick = () => {
      if (!startTime) return;
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      setElapsed(`${m}:${s.toString().padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const template =
    currentTemplate?.id === activeTemplateId
      ? currentTemplate
      : historyTemplates.find((t) => t.id === activeTemplateId);

  const activeDay = template?.days.find((d) => d.id === activeDayId);

  if (!workoutStarted || !activeDay || !template) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>No Active Session</Text>
        <Text style={styles.errorSub}>Start a routine from the Workouts tab.</Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.replace('/(tabs)/workouts')}
        >
          <Text style={styles.actionBtnText}>Go to Workouts</Text>
        </TouchableOpacity>
        
        <CelebrationModal
          visible={showCelebration}
          completedExercisesCount={0}
          totalExercisesCount={0}
          totalSetsLoggedCount={0}
          totalVolume={0}
          onClose={() => {
            setShowCelebration(false);
            resetWorkoutState();
            router.replace('/(tabs)/workouts');
          }}
        />
      </SafeAreaView>
    );
  }

  const completedCount = activeDay.exercises.filter((ex) => activeExercisesCompleted[ex.id]).length;
  const totalCount = activeDay.exercises.length;

  const totalSetsLoggedCount = activeDay.exercises.reduce((acc, ex) => {
    const sets = activeExercisesState[ex.id] || [];
    return acc + sets.filter((s) => s.completed).length;
  }, 0);

  const totalVolume = activeDay.exercises.reduce((acc, ex) => {
    const sets = activeExercisesState[ex.id] || [];
    const exerciseVol = sets.reduce((exAcc, set) => {
      if (set.completed && set.weight && set.reps) {
        const weightVal = parseFloat(set.weight) || 0;
        const repsVal = parseInt(set.reps) || 0;
        return exAcc + (weightVal * repsVal);
      }
      return exAcc;
    }, 0);
    return acc + exerciseVol;
  }, 0);

  const handleFinish = () => {
    finishWorkout();
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    resetWorkoutState();
    router.replace('/(tabs)/workouts');
  };

  const hasAnyCompleted = activeDay.exercises.some((ex) => activeExercisesCompleted[ex.id]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color={C.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Active Session</Text>
          <Text style={styles.headerSub}>{template.name}</Text>
        </View>
        <View style={styles.timerBadge}>
          <Timer size={14} color={C.primary} />
          <Text style={styles.timerText}>{elapsed}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SessionDetailCard 
          activeDay={activeDay} 
          totalExercisesCount={totalCount} 
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Exercises Completed ({completedCount}/{totalCount})
          </Text>
          <View style={styles.cardStack}>
            {activeDay.exercises.map((exercise) => {
              const isCompleted = !!activeExercisesCompleted[exercise.id];
              const isInProgress = !isCompleted && !!(activeExercisesState[exercise.id]?.some(s => s.completed || s.weight || s.reps));
              const status = isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';

              return (
                <SessionExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  status={status}
                  onPress={() => router.push(`/workouts/exercises/${exercise.id}`)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.finishBtn, !hasAnyCompleted && styles.finishBtnDisabled]}
          onPress={handleFinish}
          disabled={!hasAnyCompleted}
          activeOpacity={0.85}
        >
          <Trophy size={20} color={hasAnyCompleted ? C.primaryFg : C.textMuted} />
          <Text style={[styles.finishBtnText, !hasAnyCompleted && styles.finishBtnTextDisabled]}>
            Finish Workout Day
          </Text>
        </TouchableOpacity>
      </View>

      <CelebrationModal
        visible={showCelebration}
        completedExercisesCount={completedCount}
        totalExercisesCount={totalCount}
        totalSetsLoggedCount={totalSetsLoggedCount}
        totalVolume={totalVolume}
        onClose={handleCloseCelebration}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xl, gap: Spacing['2xl'], paddingBottom: 100 },
  
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
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: C.primaryBorder,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.primary,
    fontVariant: ['tabular-nums'],
  },

  sectionTitle: { ...Typography.section, color: C.text, marginBottom: Spacing.md },
  section: { gap: Spacing.sm },
  cardStack: { gap: Spacing.md },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    backgroundColor: C.background,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: C.primary,
    borderRadius: Radius.lg,
    paddingVertical: 18,
  },
  finishBtnDisabled: {
    backgroundColor: C.surface,
  },
  finishBtnText: {
    ...Typography.button,
    color: C.primaryFg,
    fontSize: 16,
  },
  finishBtnTextDisabled: {
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
  },
  errorSub: {
    fontSize: 14,
    color: C.textMuted,
    marginTop: 8,
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
