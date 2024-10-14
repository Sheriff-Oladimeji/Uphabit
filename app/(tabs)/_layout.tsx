import { Tabs } from "expo-router";
import React from "react";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#050a15",
            height: 60,
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#3b82f6", // Blue color for active icons
          tabBarInactiveTintColor: "#ffffff", // White color for inactive icons
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialCommunityIcons}
                name="calendar-today"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={FontAwesome6}
                name="ranking-star"
                color={color}
                size={20}
              />
            ),
          }}
        />
  
        <Tabs.Screen
          name="statistics"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialCommunityIcons}
                name="bullseye-arrow"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={FontAwesome}
                name="user-circle"
                color={color}
                size={20}
              />
            ),
          }}
        />
      </Tabs>

    </>
  );
}
