import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { WorkoutTemplate } from '@/src/store/workout.store';
import { Activity, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const C = Colors.dark;

const difficultyConfig = {
  Beginner: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  Intermediate: { color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  Advanced: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};

interface ProgramOverviewCardProps {
  template: WorkoutTemplate;
}

export const ProgramOverviewCard = ({ template }: ProgramOverviewCardProps) => {
  const diff = difficultyConfig[template.difficulty];

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <Text style={styles.title}>{template.name}</Text>

      {template.description && (
        <Text style={styles.description}>{template.description}</Text>
      )}

      <View style={styles.divider} />

      <View style={styles.badges}>
        <View style={[styles.diffBadge, { backgroundColor: diff.bg }]}>
          <Text style={[styles.diffText, { color: diff.color }]}>
            {template.difficulty}
          </Text>
        </View>

        <View style={styles.badgeRow}>
          <Clock size={13} color={C.primary} />
          <Text style={styles.badgeText}>{template.durationMinutes} min</Text>
        </View>

        <View style={styles.badgeRow}>
          <Activity size={13} color={C.primary} />
          <Text style={styles.badgeText}>
            {template.days.length} {template.days.length === 1 ? 'day' : 'days'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: 20, elevation: 3, overflow: 'hidden', position: 'relative' },
  glow: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: C.primaryMuted },
  title: { ...Typography.h3, color: C.text, fontWeight: '700' },
  description: { ...Typography.body, color: C.textMuted, marginTop: Spacing.sm, lineHeight: 20 },
  divider: { height: 1, backgroundColor: C.divider, marginTop: Spacing.lg, marginBottom: Spacing.lg },
  badges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: Spacing.md },
  diffBadge: { paddingHorizontal: Spacing.md, paddingVertical: 3, borderRadius: Radius.full },
  diffText: { fontSize: 11, fontWeight: '700' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600', color: C.textMuted },
});
