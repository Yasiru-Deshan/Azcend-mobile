import { Colors, Radius, Spacing } from '@/constants/theme';
import { Calendar, Eye } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { CheckinProgressData } from '../types';
import { CHECKIN_PHOTO_VIEWS } from '../constants';

const C = Colors.dark;

export interface CheckinHistoryItemProps {
  checkin: CheckinProgressData;
  checkinIndex: number;
  onSelectPhoto: (photo: { url: string; label: string; date: string }) => void;
}

export const CheckinHistoryItem = ({ checkin, checkinIndex, onSelectPhoto }: CheckinHistoryItemProps) => {
  const photos = checkin.photos || {
    front: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    back: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    side: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
  };

  const formattedDate = new Date(checkin.date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Calendar size={18} color={C.primary} />
          </View>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.indexText}>Check-in #{checkinIndex}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.photoGrid}>
          {CHECKIN_PHOTO_VIEWS.map((view) => {
            const imageUrl = photos[view.key];
            return (
              <View key={view.key} style={styles.photoColumn}>
                <Text style={styles.photoLabel}>{view.label}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.photoWrapper}
                  onPress={() => onSelectPhoto({ url: imageUrl, label: view.label, date: formattedDate })}
                >
                  <Image source={{ uri: imageUrl }} style={styles.photo} />
                  <View style={styles.overlay}>
                    <Eye size={16} color="#ffffff" />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    padding: 8,
    borderRadius: Radius.md,
    backgroundColor: C.primaryMuted,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  indexText: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  content: {
    padding: Spacing.lg,
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  photoColumn: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  photoLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: C.textMuted,
    marginBottom: 4,
  },
  photoWrapper: {
    width: '100%',
    aspectRatio: 9 / 14,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
});
