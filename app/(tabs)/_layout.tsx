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
                IconComponent={MaterialIcons}
                name={focused ? "home" : "home"}
                color={color}
                size={24}
              />
            ),
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
                size={24}
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
          name="goals"
          options={{
            title: "Goals",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialIcons}
                name={focused ? "check-circle" : "check-circle-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialIcons}
                name={focused ? "account-circle" : "account-circle"}
                color={color}
                size={24}
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
