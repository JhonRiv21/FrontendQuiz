import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="house.fill" color={color} />
);

const AboutTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="paperplane.fill" color={color} />
);

export default function TabLayout() {
 const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#2E245A',
          borderTopColor: 'transparent',
          height: 65 + insets.bottom,
          paddingBottom: 10 + insets.bottom,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#B58AF1',
        tabBarInactiveTintColor: '#ccc5c5',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'OpenSansSemi',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: AboutTabIcon,
        }}
      />
      <Tabs.Screen
        name="quiz/[theme]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="quiz/result/[result]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
