import { Colors, Spacing } from '@/constants/theme';
import { CheckinHistoryList } from '@/src/features/profile/components/CheckinHistoryList';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/src/store/auth.store';
import { fetchClientCheckinsApi } from '@/src/services/checkin.service';
import type { CheckinProgressData } from '@/src/features/profile/types';

const C = Colors.dark;

export default function CheckinHistoryScreen() {
  const { profile, token } = useAuthStore();
  const [checkins, setCheckins] = useState<CheckinProgressData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCheckins = async () => {
      if (!profile?.id || !token) return;
      setLoading(true);
      try {
        const response = await fetchClientCheckinsApi(profile.id, token);
        if (response.data) {
          setCheckins(response.data);
        }
      } catch (error) {
        console.error('Failed to load history checkins', error);
      } finally {
        setLoading(false);
      }
    };

    loadCheckins();
  }, [profile?.id, token]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.sectionSubtitle}>All Check-ins</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{loading ? '...' : checkins.length} check-ins</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={C.primary} style={{ marginTop: 40 }} />
        ) : (
          <CheckinHistoryList data={checkins} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: C.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.text,
  },
});
