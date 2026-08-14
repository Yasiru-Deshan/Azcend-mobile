import { Colors, Radius, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/src/store/auth.store';
import { useRouter } from 'expo-router';
import { AlertCircle, CheckSquare, Eye, EyeOff, Square } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.dark;

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = async () => {
    if (!email.trim()) return;

    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/azcend-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              Sign in to your{' '}
              <Text style={styles.brandAccent}>Azcend Fitness</Text>{' '}
              account
            </Text>
          </View>

          <View style={styles.formCard}>
            {error && (
              <View style={styles.errorBox}>
                <AlertCircle size={18} color="#f43f5e" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={C.textSubtle}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(val) => {
                  if (error) clearError();
                  setEmail(val);
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor={C.textSubtle}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(val) => {
                    if (error) clearError();
                    setPassword(val);
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={C.textMuted} />
                  ) : (
                    <Eye size={20} color={C.textMuted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.rememberRow}
              activeOpacity={0.8}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe ? (
                <CheckSquare size={20} color={C.primary} />
              ) : (
                <Square size={20} color={C.textMuted} />
              )}
              <Text style={styles.rememberText}>Remember me for 30 days</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signInBtn, isLoading && styles.signInBtnDisabled]}
              onPress={handleSignIn}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={C.primaryFg} />
              ) : (
                <Text style={styles.signInBtnText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: 15,
    color: C.textMuted,
    textAlign: 'center',
  },
  brandAccent: {
    fontWeight: '700',
    color: C.primary,
  },
  formCard: {
    backgroundColor: C.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: Spacing.xl,
    gap: Spacing.xl,
    elevation: 4,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.25)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#f43f5e',
    fontWeight: '500',
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.primary,
  },
  input: {
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    color: C.text,
    fontSize: 15,
  },
  passwordInputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rememberText: {
    fontSize: 14,
    color: C.textMuted,
  },
  signInBtn: {
    height: 54,
    backgroundColor: C.primary,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
    elevation: 3,
  },
  signInBtnDisabled: {
    opacity: 0.6,
  },
  signInBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.primaryFg,
  },
});
