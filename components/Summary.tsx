import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import useHabitStore from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";

const Summary: React.FC = () => {
  const { habits, getHabitsForDate } = useHabitStore();
  const { currentDate } = useDateStore();
  const [currentTime, setCurrentTime] = useState("");
  const [habitStats, setHabitStats] = useState({ done: 0, total: 0, percentage: 0 });
const points = 50
  useEffect(() => {
    const timer = setInterval(updateCurrentTime, 60000);
    updateCurrentTime();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateHabitStats();
  }, [habits, currentDate]);

  const updateCurrentTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  const updateHabitStats = () => {
    const habitsForToday = getHabitsForDate(currentDate);
    const total = habitsForToday.length;
    const done = habitsForToday.filter(habit => habit?.isCompleted).length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    setHabitStats({ done, total, percentage });
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
            {habitStats.percentage === 100
              ? "Great job!"
              : "You're almost done!"}
          </Text>
          <View className="flex-row justify-start items-center space-x-6">
            <View>
              <Text className="text-white text-2xl font-bold">
                {habitStats.done}/{habitStats.total}
              </Text>
              <Text className="text-gray-400 text-sm">Habits</Text>
            </View>
            <View>
              <Text className="text-white text-2xl font-bold">
                {points}
              </Text>
              <Text className="text-gray-400 text-sm">Points</Text>
            </View>
          </View>
        </View>
        <View className="ml-4">
          <AnimatedCircularProgress
            size={120}
            width={8}
            fill={habitStats.percentage}
            tintColor="#4ade80"
            backgroundColor="#374151"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View className="items-center p-4">
                <Text className="text-white text-2xl font-bold">
                  {habitStats.percentage}%
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
