// src/components/ui/Button.tsx
//
// Animated Button component using Reanimated for press feedback.
//
// Variants:
// - primary: Filled purple — main CTAs
// - secondary: Surface background with border — secondary actions
// - ghost: Transparent — tertiary actions, cancel buttons
// - danger: Filled red — destructive actions
//
// Animation: scale down to 0.96 on press (Reanimated withTiming, UI thread).
// This runs on the UI thread — never drops frames even when JS is busy.

import { Pressable, ActivityIndicator, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { ANIMATION } from '@/lib/constants';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors, spacing } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: ANIMATION.FAST });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: ANIMATION.FAST });
  };

  // ─── Variant Styles ──────────────────────────────────────────────────────────
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: colors.error,
    },
  };

  const variantTextColor: Record<ButtonVariant, string> = {
    primary: colors.textInverse,
    secondary: colors.textPrimary,
    ghost: colors.primary,
    danger: '#FFFFFF',
  };

  // ─── Size Styles ─────────────────────────────────────────────────────────────
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { paddingVertical: spacing[2], paddingHorizontal: spacing[4], borderRadius: 10 },
    md: { paddingVertical: spacing[3], paddingHorizontal: spacing[6], borderRadius: 12 },
    lg: { paddingVertical: spacing[4], paddingHorizontal: spacing[8], borderRadius: 14 },
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        animatedStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing[2],
          ...(fullWidth ? { alignSelf: 'stretch' } : { alignSelf: 'flex-start' }),
          opacity: disabled ? 0.5 : 1,
        },
        variantStyles[variant],
        sizeStyles[size],
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantTextColor[variant]} />
      ) : (
        <Text variant="bodyMedium" color={variantTextColor[variant]}>
          {children}
        </Text>
      )}
    </AnimatedPressable>
  );
}
