import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Clock } from 'lucide-react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

const C = Colors.dark;

interface WeeklyStatsCardsProps {
  workouts: number;
  minutes: number;
}

export const WeeklyStatsCards = ({ workouts, minutes }: WeeklyStatsCardsProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Weekly Progress</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Flame size={18} color={C.primary} />
            <Text style={styles.cardValue}>{workouts}</Text>
          </View>
          <Text style={styles.cardLabel}>Completed Workouts</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Clock size={18} color={C.primaryMutedOpaque} />
            <Text style={styles.cardValue}>{minutes}</Text>
          </View>
          <Text style={styles.cardLabel}>Spent Minutes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section:      { gap: Spacing.md },
  sectionTitle: { ...Typography.section, color: C.text },
  row:          { flexDirection: 'row', gap: Spacing.md },
  card:         { flex: 1, borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: Spacing.lg, gap: Spacing.sm, elevation: 3 },
  cardTopRow:   { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardValue:    { ...Typography.h2, color: C.text, lineHeight: 26 },
  cardLabel:    { ...Typography.label, color: C.textMuted },
});
