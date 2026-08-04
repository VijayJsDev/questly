// src/components/ui/Badge.tsx
//
// Small pill/chip for XP values, priority labels, streak counts, categories.

import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Text } from './Text';

export type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', size = 'md', style }: BadgeProps) {
  const { colors, spacing } = useTheme();

  const variantConfig: Record<BadgeVariant, { bg: string; text: string }> = {
    primary: { bg: colors.primaryMuted, text: colors.primary },
    accent: { bg: `${colors.accent}22`, text: colors.accent },
    success: { bg: `${colors.success}22`, text: colors.success },
    warning: { bg: `${colors.warning}22`, text: colors.warning },
    error: { bg: `${colors.error}22`, text: colors.error },
    neutral: { bg: colors.surfaceElevated, text: colors.textSecondary },
  };

  const { bg, text } = variantConfig[variant];
  const paddingV = size === 'sm' ? spacing[0.5] : spacing[1];
  const paddingH = size === 'sm' ? spacing[2] : spacing[3];

  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderRadius: 99,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        variant={size === 'sm' ? 'caption' : 'label'}
        color={text}
      >
        {label}
      </Text>
    </View>
  );
}
