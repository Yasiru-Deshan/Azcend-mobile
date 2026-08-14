import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';

const C = Colors.dark;

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const ScreenHeader = ({ title, subtitle, rightAction }: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightAction ? <View style={styles.actionGroup}>{rightAction}</View> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...Typography.h1,
    color: C.text,
  },
  subtitle: {
    fontSize: 14,
    color: C.textMuted,
  },
  actionGroup: {
    marginLeft: Spacing.md,
  },
});
