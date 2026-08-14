import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ProfileAboutCard } from '@/src/features/profile/components/ProfileAboutCard';
import { mockUserProfile } from '@/src/features/profile/mockData';
import { useRouter } from 'expo-router';
import { Camera, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

export default function ProfileTabScreen() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.screenTitle}>My Profile</Text>
          <Text style={styles.subtitle}>Manage your account and view your progress.</Text>
        </View>

        <ProfileAboutCard
          user={mockUserProfile}
          onLogout={handleLogout}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/weekly-checkin/history')}
          style={styles.linkCard}
        >
          <View style={styles.linkCardLeft}>
            <View style={styles.iconBox}>
              <Camera size={20} color={C.primary} />
            </View>
            <View>
              <Text style={styles.linkTitle}>Check-in Photos History</Text>
              <Text style={styles.linkSubtitle}>View all past progress photos</Text>
            </View>
          </View>
          <ChevronRight size={20} color={C.textMuted} />
        </TouchableOpacity>

        {/* Placeholder for future Progress Section */}
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
    fontSize: 14,
    color: C.textMuted,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
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
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: C.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },
  linkSubtitle: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
});
