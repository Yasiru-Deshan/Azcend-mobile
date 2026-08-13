import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors, brand, Spacing, Radius, Typography } from '@/constants/theme';

const C = Colors.dark;

interface DailyTipCardProps {
  tipTitle: string;
  tipDescription: string;
}

export const DailyTipCard = ({ tipTitle, tipDescription }: DailyTipCardProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Daily Tip</Text>
      <View style={styles.card}>
        <Svg width={56} height={56} viewBox="0 0 60 60" fill="none">
          <Defs>
            <LinearGradient id="bg-grad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={brand[500]} stopOpacity="0.15" />
              <Stop offset="1" stopColor={brand[800]} stopOpacity="0.15" />
            </LinearGradient>
            <LinearGradient id="bolt-grad" x1="20" y1="14" x2="38" y2="44" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={brand[300]} />
              <Stop offset="1" stopColor={brand[700]} />
            </LinearGradient>
          </Defs>
          <Rect width="60" height="60" rx="16" fill="url(#bg-grad)" />
          <Path d="M30 14L18 34H28L26 46L42 26H30L34 14Z" fill="url(#bolt-grad)" />
        </Svg>
        <View style={styles.textGroup}>
          <Text style={styles.tipTitle}>{tipTitle}</Text>
          <Text style={styles.tipDescription}>{tipDescription}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section:        { gap: Spacing.md },
  sectionTitle:   { ...Typography.section, color: C.text },
  card:           { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg, borderRadius: Radius.lg, borderWidth: 1, borderColor: C.cardBorder, backgroundColor: C.card, padding: Spacing.lg, elevation: 3 },
  textGroup:      { flex: 1, gap: 5 },
  tipTitle:       { fontSize: 14, fontWeight: '500', color: C.text },
  tipDescription: { fontSize: 13, lineHeight: 18, color: C.textMuted },
});
