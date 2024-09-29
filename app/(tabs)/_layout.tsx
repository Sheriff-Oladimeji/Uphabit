import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CreateModal from "@/components/CreateModal";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openCreateModal = () => {
    setIsModalVisible(true);
  };

  const closeCreateModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <CustomTabBar {...props} openCreateModal={openCreateModal} />
        )}
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
                IconComponent={MaterialCommunityIcons}
                name={focused ? "calendar-today" : "calendar-today"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: "Goals",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={MaterialCommunityIcons}
                name={focused ? "bullseye-arrow" : "bullseye-arrow"}
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
                size={20}
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
                IconComponent={FontAwesome}
                name={focused ? "user-circle" : "user-circle"}
                color={color}
                size={20}
              />
            ),
          }}
        />
      </Tabs>

      <CreateModal isVisible={isModalVisible} onClose={closeCreateModal} />
    </>
  );
}
