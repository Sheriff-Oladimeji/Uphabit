import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import BottomSheet from "./BottomSheet";

export interface RepeatConfig {
  type: string;
  weekDays?: string[];
  everyXDays?: string;
  xTimesPerY?: { x: string; y: string };
}

interface RepeatBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  repeatConfig: RepeatConfig;
  setRepeatConfig: (config: RepeatConfig) => void;
}

const RepeatBottomSheet: React.FC<RepeatBottomSheetProps> = ({
  isVisible,
  onClose,
  repeatConfig,
  setRepeatConfig,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(repeatConfig.type);
  const [weekDays, setWeekDays] = useState<string[]>(repeatConfig.weekDays || []);
  const [everyXDays, setEveryXDays] = useState<string>(repeatConfig.everyXDays || "");
  const [xTimesPerY, setXTimesPerY] = useState<{ x: string; y: string }>(
    repeatConfig.xTimesPerY || { x: "", y: "" }
  );

  const options = [
    { label: "Every day", value: "daily" },
    { label: "Every week", value: "weekly" },
    { label: "Every month", value: "monthly" },
    { label: "Every year", value: "yearly" },
    { label: "Select week days", value: "selectWeekDays" },
    { label: "Every X days", value: "everyXDays" },
    { label: "X times per Y", value: "xTimesPerY" },
  ];

  const weekDayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleOptionSelect = (value: string) => { // Specify the type of 'value'
    setSelectedOption(value);
    setRepeatConfig({ ...repeatConfig, type: value });
  };

  const handleWeekDayToggle = (day: string) => { // Specify the type of 'day'
    const updatedWeekDays = weekDays.includes(day)
      ? weekDays.filter((d) => d !== day)
      : [...weekDays, day];
    setWeekDays(updatedWeekDays);
    setRepeatConfig({
      ...repeatConfig,
      type: "selectWeekDays",
      weekDays: updatedWeekDays,
    });
  };

  const handleEveryXDaysChange = (value: string) => {
    setEveryXDays(value);
    setRepeatConfig({ ...repeatConfig, type: "everyXDays", everyXDays: value });
  };

  const handleXTimesPerYChange = (key: string, value: string) => { // Specify 'key' type
    const updatedXTimesPerY = { ...xTimesPerY, [key]: value };
    setXTimesPerY(updatedXTimesPerY);
    setRepeatConfig({
      ...repeatConfig,
      type: "xTimesPerY",
      xTimesPerY: updatedXTimesPerY,
    });
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={16}
      height={500}
    >
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">Period</Text>
        {options.map((option) => (
          <View key={option.value}>
            <TouchableOpacity
              onPress={() => handleOptionSelect(option.value)}
              className="flex-row items-center py-3"
            >
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedOption === option.value
                    ? "border-cyan-400 bg-cyan-400"
                    : "border-gray-400"
                } mr-3`}
              />
              <Text className="text-white text-lg">{option.label}</Text>
            </TouchableOpacity>
            {selectedOption === "selectWeekDays" &&
              option.value === "selectWeekDays" && (
                <View className="flex-row flex-wrap ml-9 mb-3">
                  {weekDayOptions.map((day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleWeekDayToggle(day)}
                      className={`m-1 px-3 py-1 rounded-full ${
                        weekDays.includes(day) ? "bg-cyan-400" : "bg-gray-700"
                      }`}
                    >
                      <Text
                        className={`${
                          weekDays.includes(day)
                            ? "text-gray-900"
                            : "text-white"
                        }`}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            {selectedOption === "everyXDays" &&
              option.value === "everyXDays" && (
                <View className="flex-row items-center ml-9 mb-3">
                  <Text className="text-white mr-2">Every</Text>
                  <TextInput
                    value={everyXDays}
                    onChangeText={handleEveryXDaysChange}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white px-2 py-1 rounded w-16"
                  />
                  <Text className="text-white ml-2">days</Text>
                </View>
              )}
            {selectedOption === "xTimesPerY" &&
              option.value === "xTimesPerY" && (
                <View className="flex-row items-center ml-9 mb-3">
                  <TextInput
                    value={xTimesPerY.x}
                    onChangeText={(value) => handleXTimesPerYChange("x", value)}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white px-2 py-1 rounded w-16 mr-2"
                  />
                  <Text className="text-white mr-2">times per</Text>
                  <TextInput
                    value={xTimesPerY.y}
                    onChangeText={(value) => handleXTimesPerYChange("y", value)}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white px-2 py-1 rounded w-16"
                  />
                </View>
              )}
          </View>
        ))}
      </View>
    </BottomSheet>
  );
};

export default RepeatBottomSheet;
