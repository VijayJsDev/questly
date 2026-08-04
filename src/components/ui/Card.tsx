// src/components/ui/Card.tsx
//
// Surface card component — the primary container for content blocks.
// Used for mission cards, stat widgets, XP panels, etc.
//
// Variants:
// - default: surface color with border
// - elevated: surfaceElevated with stronger shadow
// - glass: semi-transparent with blur effect (future — needs expo-blur)

import { View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { layout } from '@/theme/spacing';

export type CardVariant = 'default' | 'elevated' | 'outlined';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding,
  borderRadius = layout.radiusLg,
  style,
}: CardProps) {
  const { colors, spacing } = useTheme();

  const cardPadding = padding ?? spacing[4];

  const variantStyles: Record<CardVariant, ViewStyle> = {
    default: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    elevated: {
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      // Shadow (iOS)
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      // Elevation (Android)
      elevation: 4,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.border,
    },
  };

  return (
    <View
      style={[
        {
          borderRadius,
          padding: cardPadding,
        },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </View>
  );
}
