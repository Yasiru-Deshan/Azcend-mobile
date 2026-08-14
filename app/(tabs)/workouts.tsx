import { useRouter } from 'expo-router';
import { History, Trophy } from 'lucide-react-native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { ActiveSessionHeader } from '@/src/features/workouts/components/ActiveSessionHeader';
import { ExerciseSetLogger } from '@/src/features/workouts/components/ExerciseSetLogger';
import { ProgramOverviewCard } from '@/src/features/workouts/components/ProgramOverviewCard';
import { SessionExerciseItem } from '@/src/features/workouts/components/SessionExerciseItem';
import { WorkoutDaySection } from '@/src/features/workouts/components/WorkoutDaySection';
import { useWorkoutStore } from '@/src/store/workout.store';

const C = Colors.dark;

export default function WorkoutsTab() {
  const {
    currentTemplate,
    workoutStarted,
    workoutCompleted,
    activeDayId,
    activeExercisesState,
    activeExercisesCompleted,
    startTime,
    startDayWorkout,
    updateSet,
    toggleSetCompleted,
    completeExercise,
    finishWorkout,
    resetWorkoutState,
  } = useWorkoutStore();

  const activeDay = currentTemplate.days.find((d) => d.id === activeDayId);

  const completedCount = Object.values(activeExercisesCompleted).filter(Boolean).length;
  const totalCount = activeDay?.exercises.length ?? 0;

  const handleFinish = () => {
    Alert.alert(
      'Finish Workout?',
      'Great work! Are you sure you want to complete this session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Finish 🏆', style: 'default', onPress: finishWorkout },
      ]
    );
  };

  if (workoutCompleted) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.completedContainer}>
          <View style={styles.trophyCircle}>
            <Trophy size={40} color={C.primary} />
          </View>
          <Text style={styles.completedTitle}>Workout Complete!</Text>
          <Text style={styles.completedSub}>
            You crushed it. Your stats have been updated.
          </Text>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={resetWorkoutState}
            activeOpacity={0.85}
          >
            <Text style={styles.resetBtnText}>Back to Program</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (workoutStarted && activeDay) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ActiveSessionHeader
            dayName={activeDay.name}
            startTime={startTime}
            completedCount={completedCount}
            totalCount={totalCount}
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <View style={styles.cardStack}>
              {activeDay.exercises.map((exercise) => {
                const isCompleted = !!activeExercisesCompleted[exercise.id];
                const isInProgress = !isCompleted && !!(activeExercisesState[exercise.id]?.some(s => s.completed));
                const status = isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';
                const sets = activeExercisesState[exercise.id] ?? [];

                return (
                  <View key={exercise.id} style={styles.exerciseBlock}>
                    <SessionExerciseItem
                      exercise={exercise}
                      status={status}
                      onPress={() => { }}
                    />
                    {!isCompleted && (
                      <>
                        <ExerciseSetLogger
                          exercise={exercise}
                          sets={sets}
                          updateSet={updateSet}
                          toggleSetCompleted={toggleSetCompleted}
                        />
                        {sets.length > 0 && sets.every(s => s.completed) && (
                          <TouchableOpacity
                            style={styles.doneExerciseBtn}
                            onPress={() => completeExercise(exercise.id)}
                            activeOpacity={0.85}
                          >
                            <Text style={styles.doneExerciseBtnText}>
                              ✓ Mark Exercise as Done
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.finishBtn}
            onPress={handleFinish}
            activeOpacity={0.85}
          >
            <Trophy size={16} color={C.primaryFg} />
            <Text style={styles.finishBtnText}>Finish Workout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="My Program"
          rightAction={
            <TouchableOpacity onPress={() => router.push('/workouts/history')} activeOpacity={0.7}>
              <View style={styles.historyBtn}>
                <History size={20} color={C.text} />
              </View>
            </TouchableOpacity>
          }
        />

        <ProgramOverviewCard template={currentTemplate} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.cardStack}>
            {currentTemplate.days.map((day, index) => (
              <WorkoutDaySection
                key={day.id}
                day={day}
                defaultExpanded={index === 0}
                onStartWorkout={() =>
                  startDayWorkout(currentTemplate.id, day.id)
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1, backgroundColor: C.background },
  content: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['4xl'], gap: Spacing['2xl'] },

  screenTitle: { ...Typography.h1, color: C.text },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyBtn: { width: 40, height: 40, borderRadius: Radius.full, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { ...Typography.section, color: C.text },
  section: { gap: Spacing.md },
  cardStack: { gap: Spacing.md },
  exerciseBlock: { gap: Spacing.md },

  doneExerciseBtn: { backgroundColor: C.primaryMuted, borderWidth: 1, borderColor: C.primaryBorder, borderRadius: Radius.md, paddingVertical: 12, alignItems: 'center' },
  doneExerciseBtnText: { ...Typography.button, color: C.primary },

  finishBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: C.primary, borderRadius: Radius.lg, paddingVertical: 16, marginTop: Spacing.sm },
  finishBtnText: { ...Typography.button, color: C.primaryFg, fontSize: 16 },

  completedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing['3xl'], gap: Spacing.xl },
  trophyCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.primaryMuted, borderWidth: 2, borderColor: C.primaryBorder, alignItems: 'center', justifyContent: 'center' },
  completedTitle: { ...Typography.h1, color: C.text, textAlign: 'center' },
  completedSub: { ...Typography.body, color: C.textMuted, textAlign: 'center', lineHeight: 22 },
  resetBtn: { backgroundColor: C.primary, borderRadius: Radius.lg, paddingVertical: 14, paddingHorizontal: Spacing['3xl'] },
  resetBtnText: { ...Typography.button, color: C.primaryFg, fontSize: 15 },
});
