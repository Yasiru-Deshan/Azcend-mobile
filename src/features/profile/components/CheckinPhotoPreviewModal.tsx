import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { X } from 'lucide-react-native';
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = Colors.dark;

export interface CheckinPhotoPreviewModalProps {
  image: { url: string; label: string; date: string } | null;
  onClose: () => void;
}

export const CheckinPhotoPreviewModal = ({ image, onClose }: CheckinPhotoPreviewModalProps) => {
  return (
    <Modal
      visible={!!image}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        {image && (
          <View style={styles.content}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{image.label}</Text>
                <Text style={styles.subtitle}>{image.date}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={C.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image.url }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    width: '100%',
    backgroundColor: C.card,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  title: {
    ...Typography.h3,
    fontSize: 16,
    color: C.text,
  },
  subtitle: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  imageContainer: {
    height: 450,
    backgroundColor: '#000',
    padding: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.md,
  },
});
