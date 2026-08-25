import { useState, useEffect } from 'react';
import { useVideoPlayer, VideoThumbnail } from 'expo-video';

export function useVideoThumbnail(videoUrl: string | null | undefined) {
  const [thumbnail, setThumbnail] = useState<VideoThumbnail | null>(null);

  const player = useVideoPlayer(videoUrl || null);

  useEffect(() => {
    if (player && videoUrl) {
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) return;

      player.generateThumbnailsAsync([1])
        .then(thumbnails => {
          if (thumbnails && thumbnails.length > 0) {
            setThumbnail(thumbnails[0]);
          }
        })
        .catch(() => {});
    }
  }, [player, videoUrl]);

  return thumbnail;
}
