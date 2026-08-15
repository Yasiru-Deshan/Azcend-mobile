import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

const C = Colors.dark;

interface PlanInfoHeaderProps {
  name: string;
  description?: string;
  lastUpdated: string;
}

export const PlanInfoHeader = ({ name, description, lastUpdated }: PlanInfoHeaderProps) => {
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.dateRow}>
        <Calendar size={14} color={C.textMuted} />
        <Text style={styles.dateText}>Last updated {formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: Spacing.sm },
  title: { ...Typography.h1, color: C.text, fontSize: 24 },
  description: { ...Typography.body, color: C.textMuted },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.xs },
  dateText: { fontSize: 12, color: C.textMuted },
});
