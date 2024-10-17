import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import BottomSheet from "./BottomSheet";

export interface RepeatConfig {
  type: string;
  weekDays?: string[];
  everyXDays?: string;
  xTimesPerY?: { x: string; y: string };
}

export interface RepeatBottomSheetProps {
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
  const [selectedOption, setSelectedOption] = useState<string>(
    repeatConfig.type
  );
  const [weekDays, setWeekDays] = useState<string[]>(
    repeatConfig.weekDays || []
  );
  const [everyXDays, setEveryXDays] = useState<string>(
    repeatConfig.everyXDays || ""
  );
  const [xTimesPerY, setXTimesPerY] = useState<{ x: string; y: string }>(
    repeatConfig.xTimesPerY || { x: "", y: "" }
  );

  const options = [
    { label: "Every day", value: "daily" },
    { label: "Every week", value: "weekly" },
    { label: "Every month", value: "monthly" },
    { label: "Select week days", value: "selectWeekDays" },
  ];

  const weekDayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleOptionSelect = (value: string) => {
    // Specify the type of 'value'
    setSelectedOption(value);
    setRepeatConfig({ ...repeatConfig, type: value });
  };

  const handleWeekDayToggle = (day: string) => {
    // Specify the type of 'day'
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

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={16}
      height={"50%"}
    >
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Select Period
        </Text>
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
                <View className="flex-row flex-wrap  mb-3 items-center">
                  {weekDayOptions.map((day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleWeekDayToggle(day)}
                      className={`m-2 px-4 py-2  rounded-lg ${
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
          </View>
        ))}
      </View>
    </BottomSheet>
  );
};

export default RepeatBottomSheet;
