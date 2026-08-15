import { Colors, Radius, Spacing, Typography, brand } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Play } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <LinearGradient
        colors={[brand[500], brand[700]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.workoutTitle}>{title}</Text>
        <View style={styles.timeBadge}>
          <Clock size={11} color="#ffffff" />
          <Text style={styles.timeBadgeText}>{estTime}</Text>
        </View>
        <Text style={styles.description}>
          Ready to crush your goals today? Grab your gear and let's get to work!
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.startButton} onPress={onStart} activeOpacity={0.85}>
          <Play size={16} color={brand[700]} fill={brand[700]} />
          <Text style={styles.startButtonText}>{isStarted ? 'Resume Workout' : 'Start Workout'}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  sectionTitle: { ...Typography.section, color: C.text },
  card: { borderRadius: Radius.lg, padding: 18, elevation: 5, shadowColor: brand[500], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  workoutTitle: { ...Typography.h3, color: '#ffffff' },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.md, alignSelf: 'flex-start', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  timeBadgeText: { ...Typography.badge, color: '#ffffff' },
  description: { marginTop: 14, ...Typography.body, color: 'rgba(255,255,255,0.9)' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: Spacing.lg, marginBottom: Spacing.lg },
  startButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: '#ffffff', borderRadius: Radius.full, paddingVertical: 16, paddingHorizontal: Spacing.xl },
  startButtonText: { fontSize: 16, fontWeight: '700', color: brand[700] },
});
