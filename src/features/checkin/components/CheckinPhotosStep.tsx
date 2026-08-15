import { Colors, Radius, Spacing } from '@/constants/theme';
import { Camera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckinStepHeader } from './CheckinStepHeader';

const C = Colors.dark;

export const CheckinPhotosStep = () => {
  const [selectedPhotos, setSelectedPhotos] = useState<Record<string, string | null>>({
    front: null,
    back: null,
    side: null,
  });

  const handlePhotoClick = (type: string) => {
    setSelectedPhotos(prev => ({
      ...prev,
      [type]: prev[type] ? null : 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
    }));
  };

  const photoTypes = [
    { id: 'front', label: 'Front View' },
    { id: 'back', label: 'Back View' },
    { id: 'side', label: 'Side View' },
  ];

  return (
    <View style={styles.container}>
      <CheckinStepHeader
        title="Progress Photos"
        description="Upload 3 clear photos. Make sure you have good lighting and are wearing the same type of clothing as last time."
      />

      <View style={styles.grid}>
        {photoTypes.map((type) => (
          <View key={type.id} style={styles.photoColumn}>
            <Text style={styles.label}>{type.label}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePhotoClick(type.id)}
              style={styles.photoBox}
            >
              {selectedPhotos[type.id] ? (
                <>
                  <Image
                    source={{ uri: selectedPhotos[type.id]! }}
                    style={styles.image}
                  />
                  <View style={styles.changeOverlay}>
                    <Text style={styles.changeText}>Change</Text>
                  </View>
                </>
              ) : (
                <View style={styles.placeholder}>
                  <View style={styles.iconCircle}>
                    <Camera size={20} color={C.textMuted} />
                  </View>
                  <Text style={styles.uploadText}>Upload</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  photoColumn: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: C.text,
    marginBottom: Spacing.sm,
  },
  photoBox: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: C.cardBorder,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.02)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  changeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  placeholder: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconCircle: {
    padding: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  uploadText: {
    fontSize: 11,
    fontWeight: '500',
    color: C.textMuted,
  },
});
