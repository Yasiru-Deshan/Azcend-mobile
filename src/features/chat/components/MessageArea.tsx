import { Colors, Radius, Spacing } from '@/constants/theme';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ChatMessage } from '@/src/services/chat.service';

const C = Colors.dark;

interface MessageAreaProps {
  messages: ChatMessage[];
  currentUserId: string;
}

export const MessageArea = ({ messages, currentUserId }: MessageAreaProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateHeader = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  let lastDateHeader = '';

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => {
        const isMe = message.senderId === currentUserId;
        const currentDateHeader = formatDateHeader(message.createdAt);
        const showDateHeader = currentDateHeader !== lastDateHeader;

        if (showDateHeader) {
          lastDateHeader = currentDateHeader;
        }

        return (
          <View key={message.id} style={styles.messageGroup}>
            {showDateHeader && (
              <View style={styles.dateHeaderWrapper}>
                <View style={styles.dateHeaderBadge}>
                  <Text style={styles.dateHeaderText}>{currentDateHeader}</Text>
                </View>
              </View>
            )}

            <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
              <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextOther]}>
                  {message.content}
                </Text>
                <Text style={[styles.timeText, isMe ? styles.timeTextMe : styles.timeTextOther]}>
                  {formatTime(message.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['4xl'],
    gap: Spacing.lg,
  },
  messageGroup: {
    gap: Spacing.lg,
  },
  dateHeaderWrapper: {
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  dateHeaderBadge: {
    backgroundColor: C.cardBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  dateHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textMuted,
  },
  messageWrapper: {
    flexDirection: 'row',
  },
  messageWrapperMe: {
    justifyContent: 'flex-end',
  },
  messageWrapperOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    gap: 4,
  },
  bubbleMe: {
    backgroundColor: C.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  messageTextMe: {
    color: C.primaryFg,
  },
  messageTextOther: {
    color: C.text,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  timeTextMe: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  timeTextOther: {
    color: C.textSubtle,
  },
});
