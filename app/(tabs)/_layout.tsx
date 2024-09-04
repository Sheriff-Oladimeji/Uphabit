import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Ionicons, AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { CreateHabitModal } from '@/components/CreateHabit';
import { TouchableOpacity } from 'react-native';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';
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
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                IconComponent={FontAwesome}
                name={focused ? "user" : "user-o"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
     
      <CreateHabitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreateHabit={handleCreateHabit}
      />
    </>
  );
}
