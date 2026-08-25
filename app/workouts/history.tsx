import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProgramOverviewCard } from '@/src/features/workouts/components/ProgramOverviewCard';
import { useWorkoutsQuery } from '@/src/hooks/useWorkoutsQuery';
import { Colors, Spacing, Typography } from '@/constants/theme';

const C = Colors.dark;

export default function WorkoutHistoryScreen() {
  const { data } = useWorkoutsQuery();
  const historyTemplates = data?.historyTemplates || [];
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.sectionSubtitle}>Previously assigned programs</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{historyTemplates.length} programs</Text>
          </View>
        </View>

        <View style={styles.list}>
          {historyTemplates.map((template) => (
            <TouchableOpacity 
              key={template.id} 
              activeOpacity={0.8}
              onPress={() => router.push(`/workouts/templates/${template.id}`)}
            >
              <ProgramOverviewCard template={template} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll:   { flex: 1, backgroundColor: C.background },
  content:  { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['4xl'] },
  header:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.lg },
  sectionSubtitle: { fontSize: 13, fontWeight: '600', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  badge:    { backgroundColor: C.surface, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText:{ fontSize: 12, fontWeight: '600', color: C.text },
  list:     { gap: Spacing.lg },
});
