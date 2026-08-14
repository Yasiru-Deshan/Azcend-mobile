import { Colors, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const C = Colors.dark;

export interface ChatUser {
  id: string;
  name: string;
  isOnline: boolean;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatHeaderProps {
  otherUser?: ChatUser;
}

export const ChatHeader = ({ otherUser }: ChatHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarWrapper}>
        {otherUser?.avatarUrl ? (
          <Image
            source={{ uri: otherUser.avatarUrl }}
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>
              {otherUser?.name?.charAt(0) || '?'}
            </Text>
          </View>
        )}
        {otherUser?.isOnline && <View style={styles.onlineBadge} />}
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.nameText}>
          {otherUser?.name || 'Your Coach'}
        </Text>
        <Text style={styles.statusText}>
          {otherUser?.isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: C.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.primaryBorder,
  },
  avatarFallbackText: {
    fontSize: 18,
    fontWeight: '700',
    color: C.primary,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: C.online,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: C.background,
  },
  infoWrapper: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: C.textMuted,
  },
});
