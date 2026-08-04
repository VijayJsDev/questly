// src/components/ui/ProgressBar.tsx
//
// Animated horizontal progress bar using Reanimated withTiming.
// Used for daily progress, XP bars, habit completion indicators.
//
// The fill animation runs on the UI thread — smooth even under heavy JS load.
// `progress` prop: 0.0 → 1.0

import { View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { ANIMATION } from '@/lib/constants';

interface ProgressBarProps {
  progress: number;           // 0.0 → 1.0
  color?: string;             // Defaults to theme primary
  trackColor?: string;        // Defaults to theme border
  height?: number;
  borderRadius?: number;
  animated?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  color,
  trackColor,
  height = 8,
  borderRadius = 99,
  animated = true,
  style,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const fillWidth = useSharedValue(animated ? 0 : clampedProgress);

  useEffect(() => {
    fillWidth.value = withTiming(clampedProgress, { duration: ANIMATION.SLOW });
  }, [clampedProgress, fillWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${fillWidth.value * 100}%`,
  }));

  return (
    <View
      style={[
        {
          height,
          borderRadius,
          backgroundColor: trackColor ?? colors.border,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            borderRadius,
            backgroundColor: color ?? colors.primary,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
