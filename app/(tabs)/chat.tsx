import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatHeader, ChatUser, ChatMessage } from '@/src/features/chat/components/ChatHeader';
import { MessageArea } from '@/src/features/chat/components/MessageArea';
import { ChatInput } from '@/src/features/chat/components/ChatInput';
import { Colors } from '@/constants/theme';

const C = Colors.dark;

export default function ChatTabScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      chatId: 'coach-chat',
      senderId: 'coach-1',
      content: 'Hey Yasiru! How are the new macros working out for you this week?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    },
    {
      id: '2',
      chatId: 'coach-chat',
      senderId: 'me',
      content: "Pretty good! I've been hitting the protein goals easily, but slightly over on carbs a couple of days.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    }
  ]);

  const [inputValue, setInputValue] = useState('');

  const coach: ChatUser = {
    id: 'coach-1',
    name: 'Coach Sarah',
    isOnline: true,
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      chatId: 'coach-chat',
      senderId: 'me',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <ChatHeader otherUser={coach} />
          
          <MessageArea messages={messages} />
          
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
});
