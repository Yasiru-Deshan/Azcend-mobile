import { Colors, Radius } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';
import { Image } from 'expo-image';
import { PlayCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const C = Colors.dark;

interface ExerciseMediaCardProps {
  exercise: Exercise;
}

export const ExerciseMediaCard = ({ exercise }: ExerciseMediaCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: exercise.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />

      <View style={styles.overlay}>
        <PlayCircle size={48} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: C.cardBorder,
    backgroundColor: C.card,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    width: '100%',
    elevation: 2,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
