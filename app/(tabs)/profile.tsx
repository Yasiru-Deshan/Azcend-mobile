import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileAboutCard } from '@/src/features/profile/components/ProfileAboutCard';
import { mockUserProfile } from '@/src/features/profile/mockData';
import { Colors, Spacing, Typography } from '@/constants/theme';

const C = Colors.dark;

export default function ProfileTabScreen() {
  const handleLogout = () => {
    console.log('Logging out...');
    // implement logout flow
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
        
        {/* Placeholder for future sections like Check-in History and Progress */}
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
});
