import { Colors, Radius, Spacing } from '@/constants/theme';
import { Image as ImageIcon, SendHorizontal } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const C = Colors.dark;

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatInput = ({ inputValue, onInputChange, onSendMessage }: ChatInputProps) => {
  const isInputEmpty = !inputValue.trim();

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
          <ImageIcon size={20} color={C.textMuted} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={onInputChange}
          placeholder="Type a message..."
          placeholderTextColor={C.textMuted}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, isInputEmpty && styles.sendButtonDisabled]}
          onPress={onSendMessage}
          disabled={isInputEmpty}
          activeOpacity={0.7}
        >
          <SendHorizontal size={18} color={isInputEmpty ? C.textSubtle : C.primaryFg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: C.background,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: C.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: C.cardBorder,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  attachBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    color: C.text,
    fontSize: 15,
    maxHeight: 100,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginRight: 4,
  },
  sendButtonDisabled: {
    backgroundColor: C.cardBorder,
  },
});
