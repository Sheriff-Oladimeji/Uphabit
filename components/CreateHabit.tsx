import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

type CreateHabitModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onCreateHabit: (type: "break" | "build") => void;
};

export function CreateHabitModal({
  isVisible,
  onClose,
  onCreateHabit,
}: CreateHabitModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-4/5">
          <Text className="text-xl font-bold mb-4 text-center">
            Create a Habit
          </Text>
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg mb-3"
            onPress={() => onCreateHabit("break")}
          >
            <Text className="text-white text-center font-semibold">
              Break a Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 p-3 rounded-lg"
            onPress={() => onCreateHabit("build")}
          >
            <Text className="text-white text-center font-semibold">
              Build a Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4" onPress={onClose}>
            <Text className="text-blue-500 text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
