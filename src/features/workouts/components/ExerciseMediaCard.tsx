import { Colors, Radius } from '@/constants/theme';
import type { Exercise } from '@/src/store/workout.store';
import { Image } from 'expo-image';
import { PlayCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native';

const C = Colors.dark;

interface ExerciseMediaCardProps {
  exercise: Exercise;
}

export const ExerciseMediaCard = ({ exercise }: ExerciseMediaCardProps) => {
  if (!exercise.imageUrl && !exercise.videoUrl) return null;

  const handlePress = () => {
    if (exercise.videoUrl) {
      Linking.openURL(exercise.videoUrl).catch(() => {});
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={exercise.videoUrl ? 0.8 : 1}
      disabled={!exercise.videoUrl}
    >
      {exercise.imageUrl ? (
        <Image
          source={{ uri: exercise.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <View style={[styles.image, { backgroundColor: C.surface }]} />
      )}

      {exercise.videoUrl && (
        <View style={styles.overlay}>
          <PlayCircle size={48} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
        </View>
      )}
    </TouchableOpacity>
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
