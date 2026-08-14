import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { CheckinProgressData } from '../types';
import { CheckinHistoryItem } from './CheckinHistoryItem';
import { CheckinPhotoPreviewModal } from './CheckinPhotoPreviewModal';
import { Colors, Spacing, Radius } from '@/constants/theme';

const C = Colors.dark;

export interface CheckinHistoryListProps {
  data: CheckinProgressData[];
}

export const CheckinHistoryList = ({ data }: CheckinHistoryListProps) => {
  const [previewImage, setPreviewImage] = useState<{ url: string; label: string; date: string } | null>(null);

  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View style={styles.container}>
      {sortedData.map((checkin, idx) => (
        <CheckinHistoryItem
          key={checkin.id || idx}
          checkin={checkin}
          checkinIndex={sortedData.length - idx}
          onSelectPhoto={setPreviewImage}
        />
      ))}

      {sortedData.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No check-in progress photos submitted yet.</Text>
        </View>
      )}

      <CheckinPhotoPreviewModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xl,
  },
  emptyContainer: {
    padding: Spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderStyle: 'dashed',
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  emptyText: {
    color: C.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
});
