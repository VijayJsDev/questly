// src/components/layout/SafeScreen.tsx
//
// The standard screen wrapper for all Questly screens.
// Combines SafeAreaView + optional ScrollView + theme background color.
//
// WHY THIS WRAPPER?
// Every screen needs safe area insets to avoid content being hidden by:
// - iOS Dynamic Island / notch
// - iOS home indicator bar
// - Android status bar / navigation bar
// Centralizing this prevents copy-pasted SafeAreaView across every screen.

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { layout } from '@/theme/spacing';

interface SafeScreenProps {
  children: ReactNode;
  scroll?: boolean;           // Wrap in ScrollView if true
  padded?: boolean;           // Apply horizontal screen padding
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export function SafeScreen({
  children,
  scroll = false,
  padded = true,
  style,
  contentStyle,
}: SafeScreenProps) {
  const { colors } = useTheme();

  const inner = scroll ? (
    <ScrollView
      contentContainerStyle={[
        padded ? { paddingHorizontal: layout.screenPaddingX } : undefined,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        { flex: 1 },
        padded ? { paddingHorizontal: layout.screenPaddingX } : undefined,
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      edges={['top', 'left', 'right']}
    >
      {inner}
    </SafeAreaView>
  );
}
