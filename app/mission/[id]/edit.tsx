// app/mission/[id]/edit.tsx — Edit Mission Modal (Placeholder)

import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useTheme } from '@/hooks/useTheme';

export default function EditMissionModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceElevated }}>
      {/* Modal handle */}
      <View style={{ alignItems: 'center', paddingTop: spacing[3] }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
      </View>

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing[5],
          paddingTop: spacing[4],
        }}
      >
        <Text style={{ ...typography.textVariants.title, color: colors.textPrimary }}>
          Edit Mission
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ ...typography.textVariants.body, color: colors.textSecondary }}>Cancel</Text>
        </Pressable>
      </View>

      {/* Placeholder content */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing[6] }}>
        <Text style={{ fontSize: 48, marginBottom: spacing[4] }}>✏️</Text>
        <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginBottom: spacing[2] }}>
          Edit form coming soon
        </Text>
        <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>
          Mission ID: {id}
        </Text>
      </View>
    </View>
  );
}
