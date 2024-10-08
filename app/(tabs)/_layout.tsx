import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  Entypo,
  FontAwesome6,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import SelectHabitType from "@/components/SelectHabitType";
import { TouchableOpacity } from "react-native";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateHabit = (type: "break" | "build") => {
    console.log(`Creating a ${type} habit`);
    setIsModalVisible(false);
    // Add your logic here to navigate to the appropriate screen or perform an action
  };
  return (
    <>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={Ionicons}
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={Feather}
                name={focused ? "pie-chart" : "pie-chart"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setIsModalVisible(true);
            },
          }}
        />

        <Tabs.Screen
          name="rank"
          options={{
            title: "Rank",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={FontAwesome6}
                name={focused ? "ranking-star" : "ranking-star"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="focus"
          options={{
            title: "Focus",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialIcons}
                name={focused ? "timer" : "timer"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      <SelectHabitType
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      
      />
    </>
  );
}
