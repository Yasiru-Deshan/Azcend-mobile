import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

const C = Colors.dark;

interface WeeklyCheckinCardProps {
  onSubmit: () => void;
}

export const WeeklyCheckinCard = ({ onSubmit }: WeeklyCheckinCardProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Weekly Check-in</Text>
      <View style={styles.card}>
        <View style={styles.leftGroup}>
          <ClipboardList size={28} color={C.primary} />
          <Text style={styles.description}>Track your progress and stay accountable.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section:     { gap: Spacing.md },
  sectionTitle:{ ...Typography.section, color: C.text },
  card:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, paddingVertical: 14, paddingHorizontal: Spacing.lg, elevation: 3 },
  leftGroup:   { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1, paddingRight: Spacing.md },
  description: { flex: 1, ...Typography.small, color: C.textMuted },
  button:      { backgroundColor: C.primary, borderRadius: Radius.sm, paddingHorizontal: 14, paddingVertical: Spacing.sm, flexShrink: 0 },
  buttonText:  { ...Typography.label, color: C.primaryFg },
});
