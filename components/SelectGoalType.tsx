import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { Link, useRouter } from "expo-router";
import { BottomSheetProps } from "@/@types/bottomSheet";
import BottomSheet from "./BottomSheet";

export default function SelectGoalType({
  isVisible,
  onClose,
}: BottomSheetProps) {
  const refRBSheet = useRef<any>(null);
  const router = useRouter();
  const [goalType, setGoalType] = useState<"habit" | "task" | null>(null); // Updated type

  const handleSelect = (type: "habit" | "task" | null) => {
    onClose();
    setGoalType(type);
    console.log(type);
    router.push("/createHabit");
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={25}
      height="50%"
      handler={() => setGoalType(null)}
    >
      <View className="p-5 items-center w-full pb-8">
        <Text className="text-xl font-bold text-white text-center mb-5">
          What type of goal?
        </Text>
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mb-4 w-full" // Changed to blue
          onPress={() => handleSelect("habit")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Habit</Text>
          <Text className="text-sm text-white">
            Start a positive routine, like meditating, coding daily, or eating
            healthier.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-500 p-4 rounded-lg w-full" // Changed to orange
          onPress={() => handleSelect("task")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Task</Text>
          <Text className="text-sm text-white">
            Complete a specific action, like finishing a project or cleaning the
            house.
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
