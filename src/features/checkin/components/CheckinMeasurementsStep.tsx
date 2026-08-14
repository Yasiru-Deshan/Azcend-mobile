import { Colors, Radius, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CHECKIN_MEASUREMENTS, UnitSystem } from '../constants';
import { CheckinStepHeader } from './CheckinStepHeader';

const C = Colors.dark;

export const CheckinMeasurementsStep = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';
  const sizeUnit = unitSystem === 'metric' ? 'cm' : 'in';

  const updateMeasurement = (id: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [id]: value }));
  };

  return (
    <View style={styles.container}>
      <CheckinStepHeader
        title="Measurements"
        description="Enter your current weight and body measurements. Be as accurate as possible for the best tracking."
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, unitSystem === 'metric' && styles.toggleBtnActive]}
          onPress={() => setUnitSystem('metric')}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, unitSystem === 'metric' && styles.toggleTextActive]}>
            Metric
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, unitSystem === 'imperial' && styles.toggleBtnActive]}
          onPress={() => setUnitSystem('imperial')}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, unitSystem === 'imperial' && styles.toggleTextActive]}>
            Imperial
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGrid}>
        <View style={styles.inputWrapperFull}>
          <Text style={styles.label}>Current Weight</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              placeholderTextColor={C.textSubtle}
              keyboardType="decimal-pad"
              value={measurements['weight'] || ''}
              onChangeText={(val) => updateMeasurement('weight', val)}
            />
            <Text style={styles.unitText}>{weightUnit}</Text>
          </View>
        </View>

        <View style={styles.row}>
          {CHECKIN_MEASUREMENTS.slice(1).map((item) => (
            <View key={item.id} style={styles.inputWrapperHalf}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={C.textSubtle}
                  keyboardType="decimal-pad"
                  value={measurements[item.id] || ''}
                  onChangeText={(val) => updateMeasurement(item.id, val)}
                />
                <Text style={styles.unitText}>{sizeUnit}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Radius.lg,
    padding: 4,
    width: 200,
    marginBottom: Spacing.xl,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  toggleBtnActive: {
    backgroundColor: C.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
  },
  toggleTextActive: {
    color: C.text,
  },
  formGrid: {
    gap: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  inputWrapperFull: {
    width: '100%',
  },
  inputWrapperHalf: {
    width: '47%',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: C.text,
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: Radius.lg,
    height: 52,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    color: C.text,
    fontSize: 16,
    height: '100%',
  },
  unitText: {
    fontSize: 13,
    fontWeight: '500',
    color: C.textMuted,
    marginLeft: Spacing.sm,
  },
});
