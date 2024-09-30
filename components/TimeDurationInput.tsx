import React from "react";
import { View, Text, TextInput } from "react-native";

interface TimeDurationInputProps {
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;
  setTimeHours: (text: string) => void;
  setTimeMinutes: (text: string) => void;
  setTimeSeconds: (text: string) => void;
}

const TimeDurationInput: React.FC<TimeDurationInputProps> = ({
  timeHours,
  timeMinutes,
  timeSeconds,
  setTimeHours,
  setTimeMinutes,
  setTimeSeconds,
}) => (
  <View className="mb-6">
    <Text className="text-gray-300 font-semibold text-lg mb-2">
      Duration (HH:MM:SS)
    </Text>
    <View className="flex-row justify-between">
      <TextInput
        placeholder="HH"
        placeholderTextColor="#4B5563"
        value={timeHours}
        onChangeText={setTimeHours}
        keyboardType="numeric"
        className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
      />
      <TextInput
        placeholder="MM"
        placeholderTextColor="#4B5563"
        value={timeMinutes}
        onChangeText={setTimeMinutes}
        keyboardType="numeric"
        className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
      />
      <TextInput
        placeholder="SS"
        placeholderTextColor="#4B5563"
        value={timeSeconds}
        onChangeText={setTimeSeconds}
        keyboardType="numeric"
        className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
      />
    </View>
  </View>
);

export default TimeDurationInput;
