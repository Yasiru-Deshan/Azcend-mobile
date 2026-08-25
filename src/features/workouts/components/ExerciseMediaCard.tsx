import { Colors, Radius } from '@/constants/theme';
import { useSignedUrl } from '@/src/hooks/useSignedUrl';
import type { Exercise } from '@/src/store/workout.store';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { PlayCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

const C = Colors.dark;

interface ExerciseMediaCardProps {
  exercise: Exercise;
}

export const ExerciseMediaCard = ({ exercise }: ExerciseMediaCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: videoUrl } = useSignedUrl(exercise.videoUrl);
  const { data: imageUrl } = useSignedUrl(exercise.imageUrl);

  const player = useVideoPlayer(videoUrl || null, player => {
    player.loop = true;
  });

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [isPlaying, player]);

  if (!imageUrl && !videoUrl) return null;

  const handlePress = () => {
    if (!videoUrl) return;

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      Linking.openURL(videoUrl).catch(() => { });
      return;
    }

    setIsPlaying(true);
  };

  return (
    <View style={styles.card}>
      {videoUrl ? (
        <TouchableOpacity
          style={styles.media}
          onPress={isPlaying ? undefined : handlePress}
          activeOpacity={isPlaying ? 1 : 0.8}
        >
          <View pointerEvents={isPlaying ? 'auto' : 'none'} style={styles.media}>
            <VideoView
              style={styles.media}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
              nativeControls={isPlaying}
            />
          </View>

          {!isPlaying && (
            <View style={styles.overlay} pointerEvents="none">
              <PlayCircle size={48} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.media}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.media}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={[styles.media, { backgroundColor: C.surface }]} />
          )}
        </View>
      )}
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
  media: {
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
