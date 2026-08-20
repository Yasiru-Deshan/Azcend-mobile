import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { ProfileAboutCard } from '@/src/features/profile/components/ProfileAboutCard';
import { ProfileProgressSection } from '@/src/features/profile/components/ProfileProgressSection';
import { useRouter } from 'expo-router';
import { Camera, ChevronRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/src/store/auth.store';
import { fetchClientCheckinsApi } from '@/src/services/checkin.service';
import type { CheckinProgressData } from '@/src/features/profile/types';

const C = Colors.dark;

export default function ProfileTabScreen() {
  const router = useRouter();
  const { profile, isAuthenticated, token, logout } = useAuthStore();
  const [checkins, setCheckins] = useState<CheckinProgressData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

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
        console.error('Failed to load checkins', error);
      } finally {
        setLoading(false);
      }
    };

    loadCheckins();
  }, [profile?.id, token]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="My Profile"
          subtitle="Manage your account and view your progress."
        />

        <ProfileAboutCard
          user={profile}
          onLogout={handleLogout}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/weekly-checkin/history')}
          style={styles.linkCard}
        >
          <View style={styles.linkCardLeft}>
            <View style={styles.iconBox}>
              <Camera size={24} color={C.primary} />
            </View>
            <View>
              <Text style={styles.linkTitle}>Check-in Photos History</Text>
              <Text style={styles.linkSubtitle}>View all past progress photos</Text>
            </View>
          </View>
          <ChevronRight size={22} color={C.textMuted} />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color={C.primary} style={{ marginTop: 20 }} />
        ) : (
          <ProfileProgressSection data={checkins} />
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
    gap: Spacing.xl,
  },
  header: {
    gap: 4,
  },
  screenTitle: {
    ...Typography.h1,
    color: C.text,
  },
  subtitle: {
    fontSize: 15,
    color: C.textMuted,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.xl,
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  linkCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: C.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  linkSubtitle: {
    fontSize: 13,
    color: C.textMuted,
    marginTop: 2,
  },
});
