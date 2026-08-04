// src/components/feedback/EmptyState.tsx

import { View, type ViewStyle } from 'react-native';

import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

interface EmptyStateProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function EmptyState({ emoji = '✨', title, subtitle, action, style }: EmptyStateProps) {
  const { spacing } = useTheme();

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center', padding: spacing[8] }, style]}>
      <Text variant="displayMedium" style={{ marginBottom: spacing[4] }}>
        {emoji}
      </Text>
      <Text variant="title" align="center" style={{ marginBottom: spacing[2] }}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" align="center" style={{ marginBottom: spacing[6] }}>
          {subtitle}
        </Text>
      )}
      {action && (
        <Button onPress={action.onPress} variant="primary">
          {action.label}
        </Button>
      )}
    </View>
  );
}
