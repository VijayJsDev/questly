// app/(tabs)/_layout.tsx
//
// Main Tab Bar — the persistent bottom navigation of the app.
//
// Tab bar design:
// - Dark background matching our dark theme (#0D0D14)
// - Active tab: primary purple (#7C6AF7) tint on icon + label
// - Inactive tab: muted grey icons (no labels to save space)
// - No top header — screens manage their own headers
// - Custom tabBarStyle for extra height and safe area handling

import type { ColorValue } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/features/auth/store/authStore';
import { useTheme } from '@/hooks/useTheme';
import { layout } from '@/theme/spacing';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  focused: boolean;
  color: ColorValue;
  size: number;
  iconFocused: IoniconName;
  iconUnfocused: IoniconName;
}

function TabIcon({ focused, color, size, iconFocused, iconUnfocused }: TabIconProps) {
  return (
    <Ionicons
      name={focused ? iconFocused : iconUnfocused}
      size={size}
      color={color}
    />
  );
}

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { colors } = useTheme();

  // Guard: if not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: layout.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.iconMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_500Medium',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconFocused="home" iconUnfocused="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: 'Missions',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconFocused="flash" iconUnfocused="flash-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconFocused="bar-chart" iconUnfocused="bar-chart-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconFocused="settings" iconUnfocused="settings-outline" />
          ),
        }}
      />
    </Tabs>
  );
}
