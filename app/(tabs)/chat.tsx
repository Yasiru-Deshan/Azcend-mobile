import { Colors, Spacing } from '@/constants/theme';
import { ChatHeader } from '@/src/features/chat/components/ChatHeader';
import { ChatInput } from '@/src/features/chat/components/ChatInput';
import { MessageArea } from '@/src/features/chat/components/MessageArea';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

export default function ChatTabScreen() {
  const {
    messages,
    isLoading,
    isConnected,
    error,
    connectSocket,
    disconnectSocket,
    fetchMessages,
    sendMessage,
    clearError,
  } = useChatStore();

  const coach = useAuthStore((state) => state.coach);
  const currentUserId = useAuthStore((state) => state.user?.id ?? '');

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    connectSocket();

    if (coach?.id) {
      fetchMessages(coach.id);
    }

    return () => {
      disconnectSocket();
    };
  }, [coach?.id]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !coach?.id) return;
    sendMessage(inputValue.trim(), coach.id);
    setInputValue('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <ChatHeader otherUser={coach ?? undefined} />

          {!isConnected && !isLoading && (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                {error ?? 'Connecting to chat...'}
              </Text>
            </View>
          )}

          {isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator color={C.primary} />
            </View>
          ) : (
            <MessageArea messages={messages} currentUserId={currentUserId} />
          )}

          <ChatInput
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: C.cardBorder,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '500',
  },
});
