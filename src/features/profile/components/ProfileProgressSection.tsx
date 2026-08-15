import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressChart } from './ProgressChart';
import type { CheckinProgressData } from '../types';
import { PROFILE_MEASUREMENT_TABS } from '../constants';
import { Colors, Spacing, Typography, Radius } from '@/constants/theme';

const C = Colors.dark;

export interface ProfileProgressSectionProps {
  data: CheckinProgressData[];
}

export const ProfileProgressSection = ({ data }: ProfileProgressSectionProps) => {
  const [activeTab, setActiveTab] = useState(PROFILE_MEASUREMENT_TABS[0].id);

  const activeTabData = PROFILE_MEASUREMENT_TABS.find((tab) => tab.id === activeTab)!;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Progress & Growth</Text>
      
      <View style={styles.tabsWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {PROFILE_MEASUREMENT_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
                style={[
                  styles.tabButton,
                  isActive ? styles.tabButtonActive : styles.tabButtonInactive
                ]}
              >
                <Text style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ProgressChart
        title={activeTabData.label}
        dataKey={activeTabData.id}
        data={data}
        color={activeTabData.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    fontSize: 20,
    color: C.text,
    marginBottom: Spacing.md,
  },
  tabsWrapper: {
    marginBottom: Spacing.sm,
  },
  tabsContent: {
    gap: Spacing.sm,
    paddingVertical: 2,
  },
  tabButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: C.primary,
  },
  tabButtonInactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: C.primaryFg,
  },
  tabTextInactive: {
    color: C.textMuted,
  },
});
