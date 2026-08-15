import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

interface CelebrationModalProps {
  visible: boolean;
  completedExercisesCount: number;
  totalExercisesCount: number;
  totalSetsLoggedCount: number;
  totalVolume: number;
  onClose: () => void;
}

export const CelebrationModal = ({
  visible,
  completedExercisesCount,
  totalExercisesCount,
  totalSetsLoggedCount,
  totalVolume,
  onClose,
}: CelebrationModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.trophyCircle}>
            <Trophy size={48} color={C.primary} strokeWidth={2} />
          </View>
          
          <Text style={styles.title}>Workout Complete!</Text>
          <Text style={styles.subtitle}>
            You crushed it. Here's a quick summary of your session today.
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{completedExercisesCount}/{totalExercisesCount}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{totalSetsLoggedCount}</Text>
              <Text style={styles.statLabel}>Sets Logged</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{totalVolume.toLocaleString()} <Text style={styles.unit}>lbs</Text></Text>
              <Text style={styles.statLabel}>Volume</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.btnText}>Back to Program</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['3xl'],
    gap: Spacing.xl,
  },
  trophyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: C.primaryMuted,
    borderWidth: 2,
    borderColor: C.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: C.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text,
    marginBottom: 4,
  },
  unit: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
  },
  btn: {
    backgroundColor: C.primary,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: Spacing['3xl'],
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    ...Typography.button,
    color: C.primaryFg,
    fontSize: 16,
  },
});
