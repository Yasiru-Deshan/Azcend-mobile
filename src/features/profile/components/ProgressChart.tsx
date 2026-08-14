import { Colors, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import type { CheckinProgressData } from '../types';

const C = Colors.dark;
const screenWidth = Dimensions.get('window').width;

export interface ProgressChartProps {
  title: string;
  dataKey: keyof Omit<CheckinProgressData, 'date' | 'photos' | 'id'>;
  data: CheckinProgressData[];
  color?: string;
}

export const ProgressChart = ({
  title,
  dataKey,
  data,
  color = C.primary,
}: ProgressChartProps) => {
  const chartData = data
    .filter((item) => item[dataKey] !== undefined)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      value: item[dataKey] as number,
      label: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    }));

  if (chartData.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      </View>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.value));
  const yAxisMax = Math.ceil(maxValue * 1.1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.chartWrapper}>
        <LineChart
          areaChart
          data={chartData}
          width={screenWidth - 80}
          height={200}
          hideDataPoints
          spacing={60}
          color={color}
          thickness={2.5}
          startFillColor={color}
          endFillColor={color}
          startOpacity={0.4}
          endOpacity={0}
          yAxisColor="transparent"
          xAxisColor="transparent"
          yAxisTextStyle={{ color: C.textSubtle, fontSize: 11 }}
          xAxisLabelTextStyle={{ color: C.textSubtle, fontSize: 11 }}
          yAxisTextNumberOfLines={1}
          rulesType="dashed"
          rulesColor="rgba(255, 255, 255, 0.1)"
          maxValue={yAxisMax}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'rgba(255, 255, 255, 0.2)',
            pointerStripWidth: 2,
            pointerColor: color,
            radius: 6,
            pointerLabelWidth: 80,
            pointerLabelHeight: 30,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any) => {
              const item = items[0];
              return (
                <View style={styles.tooltipBox}>
                  <Text style={styles.tooltipText}>{item.value}</Text>
                </View>
              );
            },
          }}
        />
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
    marginTop: Spacing.sm,
  },
  header: {
    padding: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  emptyContainer: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: C.textMuted,
  },
  chartWrapper: {
    paddingLeft: Spacing.sm,
    paddingRight: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  tooltipBox: {
    backgroundColor: C.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: C.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    color: C.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
