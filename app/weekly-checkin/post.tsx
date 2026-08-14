import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { CheckinMeasurementsStep } from '@/src/features/checkin/components/CheckinMeasurementsStep';
import { CheckinPhotosStep } from '@/src/features/checkin/components/CheckinPhotosStep';
import { CheckinQuestionsStep } from '@/src/features/checkin/components/CheckinQuestionsStep';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

const steps = [
  { id: 'photos', title: 'Progress Photos' },
  { id: 'measurements', title: 'Measurements' },
  { id: 'questions', title: 'Reflection' }
];

export default function WeeklyCheckinPostScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    console.log('Check-in submitted!');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <ChevronLeft size={24} color={C.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Weekly Check-in</Text>
            <Text style={styles.headerSubtitle}>Step {currentStep + 1} of {steps.length}</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: index <= currentStep ? '100%' : '0%' }
                ]}
              />
            </View>
          ))}
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep === 0 && <CheckinPhotosStep />}
          {currentStep === 1 && <CheckinMeasurementsStep />}
          {currentStep === 2 && <CheckinQuestionsStep />}

          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.8}
            onPress={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            <Text style={styles.submitBtnText}>
              {currentStep === steps.length - 1 ? 'Submit Check-in' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: C.background,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h3,
    fontSize: 16,
    color: C.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: C.background,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: C.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },
  submitBtn: {
    backgroundColor: C.primary,
    paddingVertical: 18,
    borderRadius: Radius.lg,
    alignItems: 'center',
    marginTop: Spacing['2xl'],
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: C.primaryFg,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
