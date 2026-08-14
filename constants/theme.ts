import { Platform } from 'react-native';

export const brand = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#7C3AED', // Primary brand color (Violet)
  600: '#6d28d9',
  700: '#5b21b6',
  800: '#4c1d95',
  900: '#3b0764',
  950: '#2e1065',
} as const;

export const Colors = {
  light: {
    background: '#ffffff',
    surface: '#f4f4f5',
    card: '#ffffff',
    cardBorder: '#e4e4e7',
    text: '#09090b',
    textMuted: '#71717a',
    textSubtle: '#a1a1aa',
    primary: brand[500],
    primaryFg: '#ffffff',
    primaryMuted: 'rgba(124, 58, 237, 0.12)',
    primaryBorder: 'rgba(124, 58, 237, 0.25)',
    accent: '#a855f7',
    online: '#10b981',
    success: '#10b981',
    successFg: '#059669',
    tabActive: brand[500],
    tabInactive: '#a1a1aa',
    tabBar: '#ffffff',
    tabBorder: '#e4e4e7',
    divider: '#e4e4e7',
    icon: '#71717a',
  },
  dark: {
    background: '#050505',
    surface: '#0a0a0a',
    card: '#121212',
    cardBorder: '#27272a',
    text: '#ffffff',
    textMuted: '#71717a',
    textSubtle: '#52525b',
    primary: brand[500],
    primaryFg: '#ffffff',
    primaryMuted: 'rgba(124, 58, 237, 0.12)',
    primaryBorder: 'rgba(124, 58, 237, 0.25)',
    primaryMutedOpaque: 'rgba(124, 58, 237, 0.8)',
    accent: '#a855f7',
    online: '#10b981',
    success: '#10b981',
    successFg: '#34d399',
    tabActive: brand[500],
    tabInactive: '#52525b',
    tabBar: '#09090b',
    tabBorder: '#27272a',
    divider: 'rgba(39, 39, 42, 0.6)',
    icon: '#71717a',
  },
} as const;

export type ColorScheme = keyof typeof Colors;

export const ChartColors = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  rose: '#f43f5e',
  orange: '#f97316',
  yellow: '#eab308',
  lime: '#84cc16',
  green: '#22c55e',
} as const;

export const SemanticIconColors = {
  streak: '#FF9500',
  time: '#5AC8FA',
  workout: '#7C3AED',
  meals: '#4CD964',
  chat: '#FF6482',
  profile: '#E5E5E7',
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const Radius = {
  sm: 8,
  md: 10,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '700', letterSpacing: -0.2 },
  section: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  body: { fontSize: 14, lineHeight: 21 },
  small: { fontSize: 12, lineHeight: 17 },
  badge: { fontSize: 11, fontWeight: '700' },
  button: { fontSize: 14, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '600' },
} as const;
