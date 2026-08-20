import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CheckinStepHeader } from './CheckinStepHeader';
import { CHECKIN_QUESTIONS } from '../constants';
import { Colors, Spacing, Radius } from '@/constants/theme';

const C = Colors.dark;

interface CheckinQuestionsStepProps {
  questions: Record<string, string>;
  onQuestionsChange: (questions: Record<string, string>) => void;
}

export const CheckinQuestionsStep = ({ questions, onQuestionsChange }: CheckinQuestionsStepProps) => {
  const updateAnswer = (id: string, text: string) => {
    onQuestionsChange({ ...questions, [id]: text });
  };

  return (
    <View style={styles.container}>
      <CheckinStepHeader
        title="Reflection"
        description="Take a moment to reflect on your week. Honest feedback helps tailor your upcoming plan."
      />

      <View style={styles.questionsContainer}>
        {CHECKIN_QUESTIONS.map((q) => (
          <View key={q.id} style={styles.questionWrapper}>
            <Text style={styles.questionText}>{q.question}</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Type your answer here..."
              placeholderTextColor={C.textSubtle}
              multiline
              textAlignVertical="top"
              value={questions[q.id] || ''}
              onChangeText={(text) => updateAnswer(q.id, text)}
            />
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
  questionsContainer: {
    gap: Spacing.xl,
  },
  questionWrapper: {
    gap: Spacing.sm,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
    marginLeft: 4,
  },
  textArea: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: Radius.lg,
    color: C.text,
    fontSize: 15,
    minHeight: 120,
    padding: Spacing.md,
  },
});
