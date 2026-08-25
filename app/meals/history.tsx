import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useMealPlansQuery } from '@/src/hooks/useMealPlansQuery';
import { useRouter } from 'expo-router';
import { Utensils } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

export default function MealHistoryScreen() {
  const { data } = useMealPlansQuery();
  const historyPlans = data?.historyPlans || [];
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.sectionSubtitle}>Previously assigned plans</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{historyPlans.length} plans</Text>
          </View>
        </View>

        {historyPlans.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No previous meal plans found.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {historyPlans.map((plan) => {
              const formattedDate = new Date(plan.lastUpdated || plan.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <TouchableOpacity
                  key={plan.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/meals/plans/${plan.id}`)}
                  style={styles.card}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.cardTitleRow}>
                      <Utensils size={18} color={C.primary} />
                      <Text style={styles.cardTitle}>{plan.name}</Text>
                    </View>
                    {plan.isAiGenerated && (
                      <View style={styles.aiBadge}>
                        <Text style={styles.aiBadgeText}>AI</Text>
                      </View>
                    )}
                  </View>

                  {plan.description && (
                    <Text style={styles.description} numberOfLines={2}>
                      {plan.description}
                    </Text>
                  )}

                  <View style={styles.cardFooter}>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Target</Text>
                      <Text style={styles.statValue}>{plan.targetCalories} kcal</Text>
                    </View>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1, backgroundColor: C.background },
  content: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing['4xl'] },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.lg },
  sectionSubtitle: { fontSize: 13, fontWeight: '600', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  badge: { backgroundColor: C.surface, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600', color: C.text },

  list: { gap: Spacing.lg },

  card: {
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  aiBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#c084fc',
  },
  description: {
    fontSize: 13,
    color: C.textMuted,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: C.textMuted,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
  },
  dateText: {
    fontSize: 12,
    color: C.textMuted,
  },
  emptyContainer: {
    paddingVertical: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: C.textMuted,
  },
});
