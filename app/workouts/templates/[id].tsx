import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgramOverviewCard } from '@/src/features/workouts/components/ProgramOverviewCard';
import { WorkoutDaySection } from '@/src/features/workouts/components/WorkoutDaySection';
import { useWorkoutsQuery } from '@/src/hooks/useWorkoutsQuery';
import { Colors, Spacing, Typography } from '@/constants/theme';

const C = Colors.dark;

export default function WorkoutTemplateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useWorkoutsQuery();
  const historyTemplates = data?.historyTemplates || [];
  const currentTemplate = data?.currentTemplate;

  const template =
    currentTemplate?.id === id
      ? currentTemplate
      : historyTemplates.find((t) => t.id === id);

  if (!template) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Program Not Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProgramOverviewCard template={template} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Routine Breakdown</Text>
          <View style={styles.cardStack}>
            {template.days.map((day) => (
              <WorkoutDaySection
                key={day.id}
                day={day}
                defaultExpanded={true}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll:   { flex: 1, backgroundColor: C.background },
  content:  { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['4xl'], gap: Spacing['3xl'] },
  
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.background },
  errorText:       { ...Typography.h2, color: C.text },
  
  section:       { gap: Spacing.md },
  sectionTitle:  { ...Typography.section, color: C.text },
  cardStack:     { gap: Spacing.md },
});
