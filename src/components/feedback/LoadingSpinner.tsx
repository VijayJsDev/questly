// src/components/feedback/LoadingSpinner.tsx
//
// Animated loading spinner using Reanimated's withRepeat + withTiming.
// Runs on the UI thread — guaranteed smooth even when the JS thread is busy.

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export function LoadingSpinner({ size = 32, color, thickness = 3 }: LoadingSpinnerProps) {
  const { colors } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1, // Repeat infinitely
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: `${color ?? colors.primary}33`,  // Track (muted)
            borderTopColor: color ?? colors.primary,      // Active arc
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
