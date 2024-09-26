import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type OptionType = "build" | "quit" | "goal" | "task";

interface FirstStepProps {
  onOptionSelect: (option: OptionType) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onOptionSelect }) => {
  return (
    <ScrollView className="w-full">
      <View className="w-[90%] mx-auto">
        <Text className="text-white font-bold text-3xl text-center mb-8">
          What do you want to do?
        </Text>

        <TouchableOpacity
          className="bg-emerald-600 p-6 rounded-xl mb-6 w-full"
          onPress={() => onOptionSelect("build")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="build-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">Build</Text>
          </View>
          <Text className="text-sm text-emerald-100">
            Start a positive routine, like meditating, coding daily, or eating
            healthier.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-rose-700 p-6 rounded-xl mb-6 w-full"
          onPress={() => onOptionSelect("quit")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="close-circle-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">Quit</Text>
          </View>
          <Text className="text-sm text-rose-100">
            Break free from a negative pattern, like procrastination,
            overthinking, or binge-watching.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-600 p-6 rounded-xl mb-6 w-full"
          onPress={() => onOptionSelect("goal")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="flag-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">
              Set a Goal
            </Text>
          </View>
          <Text className="text-sm text-blue-100">
            Define a specific goal to work towards, like running a marathon or
            learning a new language.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-purple-600 p-6 rounded-xl w-full"
          onPress={() => onOptionSelect("task")}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="checkbox-outline" size={24} color="white" />
            <Text className="text-xl font-bold text-white ml-3">
              One-Time Task
            </Text>
          </View>
          <Text className="text-sm text-purple-100">
            Complete a specific task or challenge, like decluttering your space
            or writing a short story.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FirstStep;
