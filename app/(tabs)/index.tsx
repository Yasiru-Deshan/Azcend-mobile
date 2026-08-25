import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';
import { DailyTipCard } from '@/src/features/dashboard/components/DailyTipCard';
import { DashboardGreeting } from '@/src/features/dashboard/components/DashboardGreeting';
import { TodayWorkoutCard } from '@/src/features/dashboard/components/TodayWorkoutCard';
import { UpNextCard } from '@/src/features/dashboard/components/UpNextCard';
import { WeeklyCheckinCard } from '@/src/features/dashboard/components/WeeklyCheckinCard';
import { WeeklyStatsCards } from '@/src/features/dashboard/components/WeeklyStatsCards';
import { useAuthStore } from '@/src/store/auth.store';
import { useWorkoutStore } from '@/src/store/workout.store';
import { useWorkoutsQuery } from '@/src/hooks/useWorkoutsQuery';

const C = Colors.dark;

export default function HomeScreen() {
  const { profile, coach, user } = useAuthStore();
  const clientName = profile?.name || 'Client';

  const {
    completedWorkoutsCount,
    spentMinutesCount,
    startDayWorkout,
    workoutStarted,
  } = useWorkoutStore();

  const { data } = useWorkoutsQuery();
  const currentTemplate = data?.currentTemplate;

  const router = useRouter();

  const todaysWorkout = currentTemplate ? {
    title: currentTemplate.days[0]?.name ?? 'Upper Body Strength',
    estTime: `${currentTemplate.durationMinutes} min`,
  } : {
    title: 'No active program',
    estTime: '--',
  };

  const upNext = currentTemplate ? {
    title: currentTemplate.days[1]?.name ?? 'Lower Body Strength',
    subtitle: `Next Session • ${currentTemplate.durationMinutes} min`,
  } : {
    title: '--',
    subtitle: 'No upcoming sessions',
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={C.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DashboardGreeting
          clientName={clientName}
          coachName={coach?.name}
          coachAvatarUrl={coach?.avatarUrl}
        />

        <View style={styles.cardStack}>
          <TodayWorkoutCard
            title={todaysWorkout.title}
            estTime={todaysWorkout.estTime}
            isStarted={workoutStarted}
            onStart={() => {
              if (!workoutStarted && currentTemplate?.days[0]) {
                startDayWorkout(currentTemplate.id, currentTemplate.days[0]);
              }
            }}
          />

          {!user?.isCheckinSubmitted && (
            <WeeklyCheckinCard onSubmit={() => router.push('/weekly-checkin/post')} />
          )}

          <WeeklyStatsCards
            workouts={completedWorkoutsCount}
            minutes={spentMinutesCount}
          />

          <UpNextCard
            title={upNext.title}
            subtitle={upNext.subtitle}
            onClick={() => { }}
          />

          <DailyTipCard
            tipTitle="Consistency beats intensity."
            tipDescription="Show up, even on the hard days."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: C.background,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['4xl'],
    gap: Spacing['3xl'],
  },
  cardStack: {
    gap: Spacing['3xl'],
  },
});
