import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TrackingOptionType = "dosDonts" | "amount" | "time";

interface SecondStepProps {
  onOptionSelect: (option: TrackingOptionType) => void;
}

const SecondStep: React.FC<SecondStepProps> = ({ onOptionSelect }) => {
  return (
    <ScrollView className="w-full">
      <View className="w-[90%] mx-auto">
        <Text className="text-white font-bold text-3xl text-center mb-8">
          How do you want to track it?
        </Text>

        <TouchableOpacity
          className="bg-blue-600 p-6 rounded-xl mb-6 w-full"
          onPress={() => onOptionSelect("dosDonts")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="list-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">
              Track Do's and Don'ts
            </Text>
          </View>
          <Text className="text-sm text-blue-100">
            Keep a record of actions to take or avoid. Great for building habits
            or breaking bad ones.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-600 p-6 rounded-xl mb-6 w-full"
          onPress={() => onOptionSelect("amount")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="bar-chart-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">
              Track Specific Amount
            </Text>
          </View>
          <Text className="text-sm text-green-100">
            Monitor quantities like calories, expenses, or any numerical goal
            you want to achieve.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-purple-600 p-6 rounded-xl w-full"
          onPress={() => onOptionSelect("time")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="time-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">
              Track Specific Time
            </Text>
          </View>
          <Text className="text-sm text-purple-100">
            Measure duration for activities like exercise, study sessions, or
            time spent on projects.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SecondStep;
