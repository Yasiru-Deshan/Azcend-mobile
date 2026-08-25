import { Colors, Radius, Spacing } from '@/constants/theme';
import { Calendar, ChevronDown, ChevronUp, Eye } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SignedImage } from '../../../components/SignedImage';
import { useSignedUrl } from '../../../hooks/useSignedUrl';
import { CHECKIN_QUESTIONS } from '../../checkin/constants';
import { CHECKIN_PHOTO_VIEWS } from '../constants';
import type { CheckinProgressData } from '../types';

const C = Colors.dark;

interface PhotoCellProps {
  s3Key: string;
  label: string;
  formattedDate: string;
  onSelectPhoto: (photo: { url: string; label: string; date: string }) => void;
}

const PhotoCell = ({ s3Key, label, formattedDate, onSelectPhoto }: PhotoCellProps) => {
  const { data: url } = useSignedUrl(s3Key);

  return (
    <View style={styles.photoColumn}>
      <Text style={styles.photoLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.photoWrapper}
        onPress={() => {
          if (url) onSelectPhoto({ url, label, date: formattedDate });
        }}
      >
        <SignedImage s3Key={s3Key} style={styles.photo} />
        <View style={styles.overlay}>
          <Eye size={16} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export interface CheckinHistoryItemProps {
  checkin: CheckinProgressData;
  checkinIndex: number;
  onSelectPhoto: (photo: { url: string; label: string; date: string }) => void;
}

export const CheckinHistoryItem = ({ checkin, checkinIndex, onSelectPhoto }: CheckinHistoryItemProps) => {
  const [isQuestionsExpanded, setIsQuestionsExpanded] = useState(false);
  const photos = checkin.photos || {
    front: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    back: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    side: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
  };

  const formattedDate = new Date(checkin.date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Calendar size={18} color={C.primary} />
          </View>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.indexText}>Check-in #{checkinIndex}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.photoGrid}>
          {CHECKIN_PHOTO_VIEWS.map((view) => (
            <PhotoCell
              key={view.key}
              s3Key={photos[view.key]}
              label={view.label}
              formattedDate={formattedDate}
              onSelectPhoto={onSelectPhoto}
            />
          ))}
        </View>
        {checkin.questions && checkin.questions.length > 0 && (
          <View style={styles.questionsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.questionsHeader}
              onPress={() => setIsQuestionsExpanded(!isQuestionsExpanded)}
            >
              <Text style={styles.questionsTitle}>Q&A</Text>
              {isQuestionsExpanded ? (
                <ChevronUp size={20} color={C.textMuted} />
              ) : (
                <ChevronDown size={20} color={C.textMuted} />
              )}
            </TouchableOpacity>

            {isQuestionsExpanded && (
              <View style={styles.questionsContent}>
                {checkin.questions.map((q) => {
                  const realQuestion = CHECKIN_QUESTIONS.find(c => c.id === (q.id || q.question))?.question || q.question;
                  return (
                    <View key={q.id} style={styles.qnaItem}>
                      <Text style={styles.questionText}>{realQuestion}</Text>
                      <Text style={styles.answerText}>{q.answer || 'No answer provided.'}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
        {checkin.feedback ? (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>Feedback</Text>
            <Text style={styles.feedbackText}>{checkin.feedback}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    padding: 8,
    borderRadius: Radius.md,
    backgroundColor: C.primaryMuted,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  indexText: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  content: {
    padding: Spacing.lg,
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  photoColumn: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  photoLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: C.textMuted,
    marginBottom: 4,
  },
  photoWrapper: {
    width: '100%',
    aspectRatio: 9 / 14,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  feedbackContainer: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.primary,
    marginBottom: Spacing.xs,
  },
  feedbackText: {
    fontSize: 14,
    color: C.text,
    lineHeight: 20,
  },
  questionsContainer: {
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
  },
  questionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  questionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },
  questionsContent: {
    padding: Spacing.md,
    paddingTop: 0,
    gap: Spacing.md,
  },
  qnaItem: {
    gap: 4,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '500',
    color: C.textMuted,
  },
  answerText: {
    fontSize: 14,
    color: C.text,
    lineHeight: 20,
  },
});
