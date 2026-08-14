import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MACRO_COLORS } from '../constants';

const C = Colors.dark;

interface MacroBadgeProps {
  protein: number;
  carbs: number;
  fat: number;
  showUnit?: boolean;
}

export const MacroBadge = ({ protein, carbs, fat, showUnit = false }: MacroBadgeProps) => {
  const macros = [
    { key: 'protein', value: protein, label: 'P', color: MACRO_COLORS.protein.text },
    { key: 'carbs', value: carbs, label: 'C', color: MACRO_COLORS.carbs.text },
    { key: 'fat', value: fat, label: 'F', color: MACRO_COLORS.fat.text },
  ];

  return (
    <View style={styles.container}>
      {macros.map(({ key, value, label, color }) => (
        <Text key={key} style={[styles.text, { color }]}>
          {showUnit ? (
            <Text>
              {Math.round(value)}
              <Text style={styles.unitText}>g {label}</Text>
            </Text>
          ) : (
            `${Math.round(value)}${label}`
          )}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
    color: C.textMuted
  },
});
