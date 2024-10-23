// components/StreakGoalInput.tsx
import { View, Text, Switch } from "react-native";
import React from "react";
import InputField from "./InputField";

interface StreakGoalInputProps {
  hasStreakGoal: boolean;
  setHasStreakGoal: (value: boolean) => void;
  streakGoal: number | null;
  setStreakGoal: (goal: number | null) => void;
}

const StreakGoal = ({
  hasStreakGoal,
  setHasStreakGoal,
  streakGoal,
  setStreakGoal,
}: StreakGoalInputProps) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-300 font-semibold text-lg">
          Set Streak Goal
        </Text>
        <Switch
          value={hasStreakGoal}
          onValueChange={setHasStreakGoal}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={hasStreakGoal ? "#1d4ed8" : "#f4f3f4"}
        />
      </View>
      {hasStreakGoal && (
        <View className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <InputField
            label="Goal (days)"
            placeholder="Enter number of days"
            value={streakGoal?.toString() || ""}
            onChangeText={(text) => {
              const number = parseInt(text);
              if (!isNaN(number) && number > 0) {
                setStreakGoal(number);
              } else if (text === "") {
                setStreakGoal(null);
              }
            }}
            keyboardType="numeric"
          />
        </View>
      )}
    </View>
  );
};

export default StreakGoal;
