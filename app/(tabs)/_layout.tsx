import { Tabs } from "expo-router";
import React from "react";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0A101F", 
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 0,
            borderColor: "#9CA3AF",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#1D4ED8", 
          tabBarInactiveTintColor: "#9CA3AF", 
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
                size={22} 
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
                size={22} 
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
                size={22} 
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
                size={22} 
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
