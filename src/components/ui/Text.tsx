// src/components/ui/Text.tsx
//
// Themed Text component — the primary text element across all screens.
//
// WHY WRAP REACT NATIVE'S TEXT?
// 1. Applies theme colors automatically without passing style props everywhere
// 2. Enforces typography presets — no ad-hoc fontSize scattered in screens
// 3. Enforces Inter font family — without this, RN uses the system font
// 4. Single place to change text rendering behavior globally

import { Text as RNText, type TextStyle } from 'react-native';
import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';
import type { TextVariant } from '@/theme/typography';

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  color?: string | undefined;  // undefined allowed for exactOptionalPropertyTypes
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  selectable?: boolean;
  style?: TextStyle;
}

export function Text({
  children,
  variant = 'body',
  color,
  align,
  numberOfLines,
  selectable = false,
  style,
}: TextProps) {
  const { colors, typography } = useTheme();

  const variantStyle = typography.textVariants[variant];

  return (
    <RNText
      style={[
        variantStyle,
        { color: color ?? colors.textPrimary },
        align ? { textAlign: align } : undefined,
        style,
      ]}
      numberOfLines={numberOfLines}
      selectable={selectable}
    >
      {children}
    </RNText>
  );
}
