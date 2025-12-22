import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Background
  background: {
    primary: '#0A0E1A',
    secondary: '#111827',
    tertiary: '#1F2937',
    card: '#1E293B',
  },
  // Trading Colors
  profit: '#10B981',
  loss: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  // Text
  text: {
    primary: '#F9FAFB',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
  },
  // Accent
  accent: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
  },
  // Border
  border: '#374151',
  // Status
  active: '#10B981',
  inactive: '#6B7280',
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const LAYOUT = {
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  screenWidth: width,
  screenHeight: height,
};
