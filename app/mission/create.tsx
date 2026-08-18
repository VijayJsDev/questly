// app/mission/create.tsx — Create Mission Modal

import {
  View, Text, TextInput, Pressable, ScrollView,
  ActivityIndicator, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTheme } from '@/hooks/useTheme';
import { useCreateMission } from '@/features/missions/hooks/useMissions';
import { useMissionSets } from '@/features/missions/hooks/useMissionSets';
import {
  missionSchema,
  type MissionFormData,
  type MissionPriority,
} from '@/features/missions/types';
import { xpForPriority } from '@/features/missions/services/missionService';

const PRIORITIES: { value: MissionPriority; label: string; emoji: string; color: string }[] = [
  { value: 'low',    label: 'Easy',   emoji: '🌱', color: '#4ECDC4' },
  { value: 'medium', label: 'Normal', emoji: '⚡', color: '#FFE66D' },
  { value: 'high',   label: 'Hard',   emoji: '🔥', color: '#FF6B6B' },
];

export default function CreateMissionModal() {
  const { colors, typography, spacing } = useTheme();
  const { mutate: createMission, isPending } = useCreateMission();
  const { data: sets = [], isLoading: setsLoading } = useMissionSets();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      setId: sets[0]?.id ?? '',
    },
  });

  const priority = watch('priority');
  const xpPreview = xpForPriority(priority);


  const onSubmit = (data: MissionFormData) => {
    createMission(data, {
      onSuccess: () => router.back(),
      onError: () => Alert.alert('Error', 'Failed to create mission. Please try again.'),
    });
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
          Create Mission
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ ...typography.textVariants.body, color: colors.textSecondary }}>Cancel</Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: spacing[5], gap: spacing[6] }}>

        {/* Title */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[2] }}>
            MISSION TITLE
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="What do you want to accomplish?"
                placeholderTextColor={colors.textTertiary}
                maxLength={80}
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: errors.title ? colors.accent : colors.border,
                  borderRadius: 12,
                  padding: spacing[4],
                  ...typography.textVariants.body,
                  color: colors.textPrimary,
                }}
              />
            )}
          />
          {errors.title && (
            <Text style={{ ...typography.textVariants.caption, color: colors.accent, marginTop: spacing[1] }}>
              {errors.title.message}
            </Text>
          )}
        </View>

        {/* Description */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[2] }}>
            DESCRIPTION <Text style={{ color: colors.textTertiary }}>(optional)</Text>
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Add more details..."
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={3}
                maxLength={300}
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  padding: spacing[4],
                  ...typography.textVariants.body,
                  color: colors.textPrimary,
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
              />
            )}
          />
        </View>

        {/* Priority */}
        <View>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[3] }}>
            DIFFICULTY
          </Text>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: 'row', gap: spacing[3] }}>
                {PRIORITIES.map((p) => {
                  const isSelected = value === p.value;
                  return (
                    <Pressable
                      key={p.value}
                      onPress={() => onChange(p.value)}
                      style={({ pressed }) => ({
                        flex: 1,
                        paddingVertical: spacing[3],
                        borderRadius: 12,
                        backgroundColor: isSelected ? p.color + '22' : colors.surface,
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? p.color : colors.border,
                        alignItems: 'center',
                        opacity: pressed ? 0.75 : 1,
                        gap: spacing[1],
                      })}
                    >
                      <Text style={{ fontSize: 22 }}>{p.emoji}</Text>
                      <Text
                        style={{
                          ...typography.textVariants.caption,
                          color: isSelected ? p.color : colors.textSecondary,
                          fontWeight: isSelected ? '700' : '400',
                        }}
                      >
                        {p.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />
        </View>

        {/* XP Preview */}
        <View
          style={{
            backgroundColor: colors.primary + '15',
            borderRadius: 12,
            padding: spacing[4],
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing[3],
          }}
        >
          <Text style={{ fontSize: 28 }}>⚡</Text>
          <View>
            <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary }}>
              XP REWARD
            </Text>
            <Text style={{ ...typography.textVariants.heading, color: colors.primary }}>
              +{xpPreview} XP
            </Text>
          </View>
        </View>

        {/* Mission Set */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
            <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>
              MISSION SET
            </Text>
            <Pressable onPress={() => router.push('/mission/create-set')}>
              <Text style={{ ...typography.textVariants.caption, color: colors.primary }}>
                + New Set
              </Text>
            </Pressable>
          </View>

          {setsLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : sets.length === 0 ? (
            <Pressable
              onPress={() => router.push('/mission/create-set')}
              style={{
                borderWidth: 1.5,
                borderColor: colors.primary,
                borderStyle: 'dashed',
                borderRadius: 12,
                padding: spacing[4],
                alignItems: 'center',
              }}
            >
              <Text style={{ ...typography.textVariants.body, color: colors.primary }}>
                Create your first mission set →
              </Text>
            </Pressable>
          ) : (
            <Controller
              control={control}
              name="setId"
              render={({ field: { onChange, value } }) => (
                <View style={{ gap: spacing[2] }}>
                  {sets.map((set) => {
                    const isSelected = value === set.id;
                    return (
                      <Pressable
                        key={set.id}
                        onPress={() => onChange(set.id)}
                        style={({ pressed }) => ({
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: spacing[4],
                          borderRadius: 12,
                          backgroundColor: isSelected ? colors.primary + '18' : colors.surface,
                          borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected ? colors.primary : colors.border,
                          opacity: pressed ? 0.75 : 1,
                          gap: spacing[3],
                        })}
                      >
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: isSelected ? colors.primary : colors.border,
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isSelected && (
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' }} />
                          )}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ ...typography.textVariants.body, color: colors.textPrimary }}>
                            {set.name}
                          </Text>
                          <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>
                            {set.activeDays.map((d) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]).join(' · ')}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            />
          )}
          {errors.setId && (
            <Text style={{ ...typography.textVariants.caption, color: colors.accent, marginTop: spacing[1] }}>
              {errors.setId.message}
            </Text>
          )}
        </View>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending || sets.length === 0}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: 14,
            padding: spacing[4],
            alignItems: 'center',
            opacity: isPending || sets.length === 0 ? 0.5 : pressed ? 0.85 : 1,
            marginTop: spacing[2],
          })}
        >
          {isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ ...typography.textVariants.label, color: '#FFFFFF', fontSize: 16 }}>
              Create Mission
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
