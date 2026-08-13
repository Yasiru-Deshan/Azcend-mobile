import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dumbbell, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

const C = Colors.dark;

interface UpNextCardProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const UpNextCard = ({ title, subtitle, onClick }: UpNextCardProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Up Next</Text>
      <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.75}>
        <View style={styles.leftGroup}>
          <Dumbbell size={22} color={C.accent} />
          <View style={styles.textGroup}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={C.textSubtle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section:     { gap: Spacing.md },
  sectionTitle:{ ...Typography.section, color: C.text },
  card:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: Spacing.lg, elevation: 3 },
  leftGroup:   { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  textGroup:   { gap: 3 },
  title:       { fontSize: 14, fontWeight: '500', color: C.text },
  subtitle:    { fontSize: 11, color: C.textSubtle },
});
