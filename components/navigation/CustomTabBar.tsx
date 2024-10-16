import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import { useRouter } from "expo-router";
export function CustomTabBar({
  state,
  descriptors,
  navigation,
  openCreateModal, // Add this prop
}: BottomTabBarProps & { openCreateModal: () => void }) { // Update the type

  const router = useRouter()
  
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (index === 2) {
          return (
            <View key={route.key} style={styles.createButtonWrapper}>
              <View style={styles.createButtonContainer}>
                <TouchableOpacity
                  onPress={openCreateModal} // Change this line
                  style={styles.createButton}
                >
                  <Entypo name="plus" size={28} color="white" />
                </TouchableOpacity>
              </View>
              {/* Removed SelectHabitType component */}
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? "#3b82f6" : "#94a3b8", 
                size: 24,
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#050a15", 
    height: 70,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  createButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonContainer: {
    position: "absolute",
    top: -60, 
    alignItems: "center",
    justifyContent: "center",
  },
  createButton: {
    backgroundColor: "#3b82f6", 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
