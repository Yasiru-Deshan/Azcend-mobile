import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Clock } from 'lucide-react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

const C = Colors.dark;

interface TodayWorkoutCardProps {
  title: string;
  estTime: string;
  onStart: () => void;
  isStarted?: boolean;
}

export const TodayWorkoutCard = ({ title, estTime, onStart, isStarted = false }: TodayWorkoutCardProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today's Workout</Text>
      <View style={styles.card}>
        <Text style={styles.workoutTitle}>{title}</Text>
        <View style={styles.timeBadge}>
          <Clock size={11} color={C.primary} />
          <Text style={styles.timeBadgeText}>{estTime}</Text>
        </View>
        <Text style={styles.description}>
          Ready to crush your goals today? Grab your gear and let's get to work!
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.startButton} onPress={onStart} activeOpacity={0.85}>
          <Play size={14} color={C.primaryFg} fill={C.primaryFg} />
          <Text style={styles.startButtonText}>{isStarted ? 'Resume Workout' : 'Start Workout'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section:         { gap: Spacing.md },
  sectionTitle:    { ...Typography.section, color: C.text },
  card:            { borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: 18, elevation: 3 },
  workoutTitle:    { ...Typography.h3, color: C.text },
  timeBadge:       { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.md, alignSelf: 'flex-start', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full, backgroundColor: C.primaryMuted, borderWidth: 1, borderColor: C.primaryBorder },
  timeBadgeText:   { ...Typography.badge, color: C.primary },
  description:     { marginTop: 14, ...Typography.body, color: C.textMuted },
  divider:         { height: 1, backgroundColor: C.divider, marginTop: Spacing.lg, marginBottom: Spacing.lg },
  startButton:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: C.primary, borderRadius: Radius.md, paddingVertical: 13 },
  startButtonText: { ...Typography.button, color: C.primaryFg },
});
