import React, { useState, useEffect } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useRouter } from "expo-router";

const Summary: React.FC = () => {
  const progress = 52;
  const habitsDone = 2;
  const totalHabits = 3;
  const tasksDone = 3;
  const totalTasks = 5;
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      updateCurrentTime();
    }, 60000);

    updateCurrentTime();

    return () => clearInterval(timer);
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <View className="mt-6 ">
      <View className="flex flex-row justify-between items-center mb-3">
        <Text className="text-white font-bold text-2xl ">Today's Habit</Text>
        <View className="bg-gray-700 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-base">{currentTime}</Text>
        </View>
      </View>

      <View className="bg-gray-800 p-5 rounded-2xl flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold mb-4">
            You're almost done!
          </Text>
          <View className="flex-row justify-start items-center space-x-6">
            <View>
              <Text className="text-white text-2xl font-bold">
                {habitsDone}/{totalHabits}
              </Text>
              <Text className="text-gray-400 text-sm">Habits</Text>
            </View>
            <View>
              <Text className="text-white text-2xl font-bold">
                {tasksDone}/{totalTasks}
              </Text>
              <Text className="text-gray-400 text-sm">Tasks</Text>
            </View>
          </View>
        </View>
        <View className="ml-4">
          <AnimatedCircularProgress
            size={90}
            width={8}
            fill={progress}
            tintColor="#4ade80"
            backgroundColor="#374151"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">
                  {progress}%
                </Text>
                <Text className="text-gray-400 text-xs">Completed</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
};

export default Summary;
