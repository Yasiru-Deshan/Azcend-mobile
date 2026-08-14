import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

const C = Colors.dark;

interface CheckinStepHeaderProps {
  title: string;
  description: string;
}

export const CheckinStepHeader = ({ title, description }: CheckinStepHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: C.text,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    color: C.textMuted,
    lineHeight: 20,
  },
});
