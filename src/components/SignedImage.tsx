import { Colors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';
import { useSignedUrl } from '../hooks/useSignedUrl';

interface SignedImageProps {
  s3Key?: string | null;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export const SignedImage = ({ s3Key, style, resizeMode = 'cover' }: SignedImageProps) => {
  const { data: url, isPending: loading } = useSignedUrl(s3Key);

  if (loading || !url) {
    return (
      <View style={[styles.placeholder, style as any]}>
        <ActivityIndicator size="small" color={Colors.dark.textMuted} />
      </View>
    );
  }

  return <Image source={{ uri: url }} style={style} resizeMode={resizeMode} />;
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
