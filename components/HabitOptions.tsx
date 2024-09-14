import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet from "./BottomSheet";
import { MaterialIcons } from '@expo/vector-icons';

interface HabitOptionsProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  name: string;
}

const HabitOptions = ({
  isVisible,
  onClose,
  onDelete,
  onEdit,
  name,
}: HabitOptionsProps) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={25}
      height="40%"
    >
      <View className="w-[90%] mx-auto py-5">
        <Text className="text-center text-white text-2xl font-bold mb-8">
          {name}
        </Text>
        <TouchableOpacity
          onPress={onEdit}
          className="bg-blue-500 w-full py-4 rounded-2xl mb-4 active:opacity-80 flex-row items-center justify-center"
        >
          <MaterialIcons name="edit-square" size={24} color="white" style={{ marginRight: 8 }} />
          <Text className="text-center text-white text-lg font-semibold">
            Edit Habit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="bg-red-500 w-full py-4 rounded-2xl active:opacity-80 flex-row items-center justify-center"
        >
          <MaterialIcons name="delete" size={24} color="white" style={{ marginRight: 8 }} />
          <Text className="text-center text-white text-lg font-semibold">
            Delete Habit
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default HabitOptions;
