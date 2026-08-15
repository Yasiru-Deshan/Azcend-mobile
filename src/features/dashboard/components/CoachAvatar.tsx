import { Colors, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const C = Colors.dark;

interface CoachAvatarProps {
  coachName?: string;
  coachAvatarUrl?: string;
  isOnline?: boolean;
}

export const CoachAvatar = ({
  coachName,
  coachAvatarUrl,
  isOnline = true,
}: CoachAvatarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: coachAvatarUrl }} style={styles.avatar} />
        {isOnline && <View style={styles.onlineDot} />}
      </View>
      <Text style={styles.name} numberOfLines={1}>{coachName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: Spacing.xs, flexShrink: 0 },
  avatarWrapper: { position: 'relative', width: 48, height: 48 },
  avatar: { width: 48, height: 48, borderRadius: Radius.full, borderWidth: 2, borderColor: C.primaryBorder },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 13, height: 13, borderRadius: Radius.full, backgroundColor: C.online, borderWidth: 2, borderColor: C.background },
  name: { fontSize: 11, fontWeight: '600', color: C.textMuted, letterSpacing: -0.3, maxWidth: 72 },
});
