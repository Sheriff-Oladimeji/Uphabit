import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet from "./BottomSheet";

interface HabitOptionsProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  name: string;
}

const HabitOptions = ({ isVisible, onClose, onDelete, onEdit, name }: HabitOptionsProps) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose} radius={25} height="40%">
      <View className="w-[90%] mx-auto py-5">
        <Text className="text-center text-white text-xl font-bold">{name}</Text>
        <TouchableOpacity
          onPress={onEdit}
          className="bg-red-500 w-full py-4 rounded-lg mb-5 mt-12 "
        >
          <Text className="text-center text-white text-lg">Edit Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="bg-blue-500 w-full py-4 rounded-lg "
        >
          <Text className="text-center text-white text-lg">Delete Habit</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

;

export default HabitOptions;
