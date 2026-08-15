import { Colors, Spacing, Typography } from '@/constants/theme';
import { CalendarDays } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CoachAvatar } from './CoachAvatar';

const C = Colors.dark;

interface DashboardGreetingProps {
  clientName: string;
  coachName?: string;
  coachAvatarUrl?: string;
}

export const DashboardGreeting = ({ clientName, coachName, coachAvatarUrl }: DashboardGreetingProps) => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.heading}>Hey {clientName}</Text>
        <View style={styles.dateRow}>
          <CalendarDays size={14} color={C.icon} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>
      <CoachAvatar coachName={coachName} coachAvatarUrl={coachAvatarUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing.lg },
  textGroup: { flexDirection: 'column', gap: 6, flex: 1 },
  heading: { ...Typography.h1, color: C.text },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 13, color: C.textMuted },
});
