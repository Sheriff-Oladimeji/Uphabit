import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { Link, useRouter } from "expo-router";
import { BottomSheetProps } from "@/types/bottomSheet";
import BottomSheet from "./BottomSheet";


export default function SelectHabitType({ isVisible, onClose,  }: BottomSheetProps) {
  const refRBSheet = useRef<any>(null);
  const router = useRouter();
  const [habitType, setHabitType] = useState<"build" | "quit" | null>(null);




  const handleSelect = (type: "build" | "quit" | null) => {
    onClose();
    setHabitType(type);
    console.log(type);

    router.push("/createHabit");
  };
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={25}
      height="50%"
      handler={ () => setHabitType(null)}
    >
      <View className="p-5 items-center w-full pb-8">
        <Text className="text-xl font-bold text-white text-center mb-5">
          What type of habit?
        </Text>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg mb-4 w-full"
          onPress={() => handleSelect("build")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Build</Text>
          <Text className="text-sm text-white">
            Start a positive routine, like meditating, coding daily, or eating
            healthier.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 p-4 rounded-lg w-full"
          onPress={() => handleSelect("quit")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Quit</Text>
          <Text className="text-sm text-red-100">
            Break free from a negative pattern, like procrastination,
            overthinking, or binge-watching.
          </Text>
        </TouchableOpacity>
      </View>
  </BottomSheet>
  );
}
