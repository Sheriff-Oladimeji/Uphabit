// components/CategoryBottomSheet.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet from "./BottomSheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export type CategoryType =
  | "sport"
  | "health"
  | "work"
  | "finance"
  | "social"
  | "fun"
  | "other";

interface CategoryOption {
  value: CategoryType;
  label: string;
  icon: React.ReactNode;
}

interface CategoryBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
}

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedCategory,
  setSelectedCategory,
}) => {
  const categoryOptions: CategoryOption[] = [
    {
      label: "Sport",
      value: "sport",
      icon: (
        <MaterialCommunityIcons name="basketball" size={24} color="white" />
      ),
    },
    {
      label: "Health",
      value: "health",
      icon: <Ionicons name="fitness" size={24} color="white" />,
    },
    {
      label: "Work",
      value: "work",
      icon: <MaterialCommunityIcons name="briefcase" size={24} color="white" />,
    },
    {
      label: "Finance",
      value: "finance",
      icon: <FontAwesome5 name="money-bill-wave" size={24} color="white" />,
    },
    {
      label: "Social",
      value: "social",
      icon: <Ionicons name="people" size={24} color="white" />,
    },
    {
      label: "Fun",
      value: "fun",
      icon: <Ionicons name="game-controller" size={24} color="white" />,
    },
    {
      label: "Other",
      value: "other",
      icon: (
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color="white"
        />
      ),
    },
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={16}
      height={"60%"}
      draggable={true}
    >
      <ScrollView className="px-4 pb-12 flex-1">
        <Text className="text-white text-2xl font-bold mb-4">
          Select Category
        </Text>
        {categoryOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => {
              setSelectedCategory(option.value);
              onClose();
            }}
            className="flex-row items-center py-3"
          >
            <View
              className={`w-10 h-10 rounded-full ${
                selectedCategory === option.value
                  ? "bg-cyan-400"
                  : "bg-gray-700"
              } mr-3 items-center justify-center`}
            >
              {option.icon}
            </View>
            <Text className="text-white text-lg">{option.label}</Text>
            {selectedCategory === option.value && (
              <View className="ml-auto">
                <Ionicons name="checkmark-circle" size={24} color="#2dd4bf" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

export default CategoryBottomSheet;
