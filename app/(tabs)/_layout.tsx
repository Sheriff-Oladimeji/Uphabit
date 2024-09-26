import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CreateModal from "@/components/CreateModal"; // Import CreateModal
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
        tabBar={(props) => <CustomTabBar {...props} openCreateModal={openCreateModal} />}
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
        {/* Other Tab Screens */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
          }}
        />
        {/* Other Tab Screens */}
      </Tabs>

      <CreateModal
        isVisible={isModalVisible}
        onClose={closeCreateModal} // Pass the close function
      />
    </>
  );
}
