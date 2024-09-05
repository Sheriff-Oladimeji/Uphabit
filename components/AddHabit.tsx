import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import useHabitStore from "@/store/useHabitStore";

interface AddHabitFormProps {
  type: "build" | "quit";
  onClose: () => void;
}

export function AddHabitForm({ type, onClose }: AddHabitFormProps) {
  const [habitName, setHabitName] = useState("");
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = async () => {
    if (habitName.trim()) {
      await addHabit({ name: habitName.trim(), type });
      onClose();
    }
  };

  return (
    <View className="p-5">
      <Text className="text-xl font-bold text-white mb-4">
        {type === "build" ? "Build a new habit" : "Quit a habit"}
      </Text>
      <TextInput
        className="bg-gray-700 text-white p-3 rounded-lg mb-4"
        placeholder="Enter habit name"
        placeholderTextColor="#9ca3af"
        value={habitName}
        onChangeText={setHabitName}
      />
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
}
