import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { Award, LogOut, Mail, Phone } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { UserProfile } from '../types';

const C = Colors.dark;

interface ProfileAboutCardProps {
  user: UserProfile;
  onLogout?: () => void;
  onEditProfile?: () => void;
}

export const ProfileAboutCard = ({ user, onLogout, onEditProfile }: ProfileAboutCardProps) => {
  const formattedDate = new Date(user.joinedAt).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.nameText} numberOfLines={1}>{user.name}</Text>
          <Text style={styles.joinedText}>Member since {formattedDate}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Mail size={18} color={C.textMuted} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={18} color={C.textMuted} />
          <Text style={styles.infoText}>{user.mobile}</Text>
        </View>
        <View style={styles.infoRow}>
          <Award size={18} color={C.textMuted} />
          <Text style={styles.infoText}>
            Subscription: <Text style={styles.subscriptionBold}>{user.subscription}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          activeOpacity={0.7}
          onPress={onEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {onLogout && (
          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            activeOpacity={0.7}
            onPress={onLogout}
          >
            <LogOut size={16} color="#f43f5e" />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: C.primaryMutedOpaque,
  },
  headerTextContainer: {
    flex: 1,
  },
  nameText: {
    ...Typography.h2,
    fontSize: 24,
    color: C.text,
    marginBottom: 4,
  },
  joinedText: {
    fontSize: 14,
    color: C.textMuted,
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoText: {
    fontSize: 15,
    color: C.text,
  },
  subscriptionBold: {
    fontWeight: '700',
    color: C.primary,
  },
  actionSection: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 44,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  editButton: {
    borderColor: C.cardBorder,
    backgroundColor: C.surface,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  logoutButton: {
    borderColor: 'rgba(244, 63, 94, 0.2)',
    backgroundColor: 'rgba(244, 63, 94, 0.05)',
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f43f5e',
  },
});
