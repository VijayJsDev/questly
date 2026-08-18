// app/mission/create-set.tsx — Create Mission Set Modal

import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTheme } from '@/hooks/useTheme';
import { useCreateMissionSet } from '@/features/missions/hooks/useMissionSets';
import { missionSetSchema, DAY_LABELS, type MissionSetFormData, type DayOfWeek } from '@/features/missions/types';

const ALL_DAYS: DayOfWeek[] = [0, 1, 2, 3, 4, 5, 6];

export default function CreateSetModal() {
  const { colors, typography, spacing } = useTheme();
  const { mutate: createSet, isPending } = useCreateMissionSet();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MissionSetFormData>({
    resolver: zodResolver(missionSetSchema),
    defaultValues: { name: '', activeDays: [] },
  });

  const activeDays = watch('activeDays');

  const toggleDay = (day: DayOfWeek) => {
    const current = activeDays ?? [];
    const next = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day].sort((a, b) => a - b);
    setValue('activeDays', next as DayOfWeek[], { shouldValidate: true });
  };

  const onSubmit = (data: MissionSetFormData) => {
    createSet(data, { onSuccess: () => router.back() });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.surfaceElevated }}
      contentContainerStyle={{ paddingBottom: spacing[10] }}
      keyboardShouldPersistTaps="handled"
    >
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
          New Mission Set
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ ...typography.textVariants.body, color: colors.textSecondary }}>Cancel</Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: spacing[5], gap: spacing[6] }}>
        {/* Set Name */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[2] }}>
            SET NAME
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="e.g. Morning Routine"
                placeholderTextColor={colors.textTertiary}
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: errors.name ? colors.accent : colors.border,
                  borderRadius: 12,
                  padding: spacing[4],
                  ...typography.textVariants.body,
                  color: colors.textPrimary,
                }}
              />
            )}
          />
          {errors.name && (
            <Text style={{ ...typography.textVariants.caption, color: colors.accent, marginTop: spacing[1] }}>
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Active Days */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[3] }}>
            ACTIVE DAYS
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing[2], flexWrap: 'wrap' }}>
            {ALL_DAYS.map((day) => {
              const isSelected = (activeDays ?? []).includes(day);
              return (
                <Pressable
                  key={day}
                  onPress={() => toggleDay(day)}
                  style={({ pressed }) => ({
                    paddingHorizontal: spacing[4],
                    paddingVertical: spacing[3],
                    borderRadius: 10,
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    opacity: pressed ? 0.7 : 1,
                    minWidth: 52,
                    alignItems: 'center',
                  })}
                >
                  <Text
                    style={{
                      ...typography.textVariants.label,
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    }}
                  >
                    {DAY_LABELS[day]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.activeDays && (
            <Text style={{ ...typography.textVariants.caption, color: colors.accent, marginTop: spacing[2] }}>
              {errors.activeDays.message}
            </Text>
          )}
        </View>

        {/* Quick presets */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[2] }}>
            QUICK PRESETS
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing[3] }}>
            {[
              { label: 'Weekdays', days: [1, 2, 3, 4, 5] as DayOfWeek[] },
              { label: 'Weekends', days: [0, 6] as DayOfWeek[] },
              { label: 'Every Day', days: [0, 1, 2, 3, 4, 5, 6] as DayOfWeek[] },
            ].map((preset) => (
              <Pressable
                key={preset.label}
                onPress={() => setValue('activeDays', preset.days, { shouldValidate: true })}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: spacing[2],
                  borderRadius: 8,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  alignItems: 'center',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary }}>
                  {preset.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={({ pressed }) => ({
            backgroundColor: isPending ? colors.primaryLight : colors.primary,
            borderRadius: 14,
            padding: spacing[4],
            alignItems: 'center',
            opacity: pressed ? 0.85 : 1,
            marginTop: spacing[4],
          })}
        >
          {isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ ...typography.textVariants.label, color: '#FFFFFF', fontSize: 16 }}>
              Create Set
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
