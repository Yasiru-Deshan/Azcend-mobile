import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/src/store/auth.store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && segments[0] !== 'login') {
      router.replace('/login');
    } else if (isAuthenticated && segments[0] === 'login') {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="workouts/history" options={{ title: 'Workout History', headerBackTitle: 'Back' }} />
        <Stack.Screen name="workouts/templates/[id]" options={{ title: 'Program Details', headerBackTitle: 'Back' }} />
        <Stack.Screen name="meals/history" options={{ title: 'Meal Plan History', headerBackTitle: 'Back' }} />
        <Stack.Screen name="meals/plans/[id]" options={{ title: 'Meal Plan Details', headerBackTitle: 'Back' }} />
        <Stack.Screen name="weekly-checkin/history" options={{ title: 'Check-in History', headerBackTitle: 'Back' }} />
        <Stack.Screen name="weekly-checkin/post" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
