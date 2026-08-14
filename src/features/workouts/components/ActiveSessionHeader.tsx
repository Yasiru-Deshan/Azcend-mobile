import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { CheckCircle2, Timer } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const C = Colors.dark;

interface ActiveSessionHeaderProps {
  dayName: string;
  startTime: number | null;
  completedCount: number;
  totalCount: number;
}

export const ActiveSessionHeader = ({
  dayName,
  startTime,
  completedCount,
  totalCount,
}: ActiveSessionHeaderProps) => {
  const [elapsed, setElapsed] = useState('0:00');

  useEffect(() => {
    const tick = () => {
      if (!startTime) return;
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      setElapsed(`${m}:${s.toString().padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>ACTIVE SESSION</Text>
          <Text style={styles.dayName} numberOfLines={1}>{dayName}</Text>
        </View>
        <View style={styles.timerBadge}>
          <Timer size={13} color={C.primary} />
          <Text style={styles.timerText}>{elapsed}</Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
        </View>
        <View style={styles.progressLabel}>
          <CheckCircle2 size={12} color={C.primary} />
          <Text style={styles.progressText}>{completedCount}/{totalCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: Radius.lg, borderWidth: 1, borderColor: C.primaryBorder, backgroundColor: 'rgba(140,212,0,0.05)', padding: Spacing.lg, gap: Spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing.md },
  label: { fontSize: 10, fontWeight: '700', color: C.primary, letterSpacing: 1, textTransform: 'uppercase' },
  dayName: { ...Typography.section, color: C.text, marginTop: 2, flex: 1 },
  timerBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: C.primaryMuted, borderWidth: 1, borderColor: C.primaryBorder, flexShrink: 0 },
  timerText: { fontSize: 13, fontWeight: '700', color: C.primary, fontVariant: ['tabular-nums'] },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  progressTrack: { flex: 1, height: 5, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: C.primary, borderRadius: Radius.full },
  progressLabel: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  progressText: { fontSize: 11, fontWeight: '600', color: C.primary },
});
