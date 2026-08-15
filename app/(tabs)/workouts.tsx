import { useFocusEffect, useRouter } from 'expo-router';
import { History } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { ProgramOverviewCard } from '@/src/features/workouts/components/ProgramOverviewCard';
import { WorkoutDaySection } from '@/src/features/workouts/components/WorkoutDaySection';
import { useWorkoutStore } from '@/src/store/workout.store';

const C = Colors.dark;

export default function WorkoutsTab() {
  const { currentTemplate, startDayWorkout, isLoading, fetchWorkouts } = useWorkoutStore();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [fetchWorkouts])
  );

  const handleStartWorkout = (dayId: string) => {
    if (!currentTemplate) return;
    startDayWorkout(currentTemplate.id, dayId);
    router.push('/workouts/session');
  };

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

        {isLoading ? (
          <View style={{ padding: Spacing.xl, alignItems: 'center' }}>
            <Text style={{ color: C.textMuted }}>Loading workout plan...</Text>
          </View>
        ) : !currentTemplate ? (
          <View style={{ padding: Spacing.xl, alignItems: 'center', backgroundColor: C.surface, borderRadius: Radius.lg }}>
            <Text style={{ ...Typography.h3, color: C.text, marginBottom: Spacing.sm }}>No Active Program</Text>
            <Text style={{ ...Typography.body, color: C.textMuted, textAlign: 'center' }}>
              Your coach hasn't assigned a program yet, or you haven't started one.
            </Text>
          </View>
        ) : (
          <>
            <ProgramOverviewCard template={currentTemplate} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Weekly Schedule</Text>
              <View style={styles.cardStack}>
                {currentTemplate.days.map((day, index) => (
                  <WorkoutDaySection
                    key={day.id}
                    day={day}
                    defaultExpanded={index === 0}
                    onStartWorkout={() => handleStartWorkout(day.id)}
                  />
                ))}
              </View>
            </View>
          </>
        )}
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
});
