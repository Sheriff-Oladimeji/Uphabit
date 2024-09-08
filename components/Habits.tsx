import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import useHabitStore from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DeleteHabitButton from "./DeleteHabitButton";
import { format, isToday } from "date-fns";

interface Habit {
  id: string;
  name: string;
  type: "build" | "quit";
  startDate: string;
  createdAt: string;
}

const Habits = () => {
  const { habits, loadHabits, getHabitsForDate } = useHabitStore();
  const { currentDate } = useDateStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      await loadHabits();
      setIsLoading(false);
    };
    fetchHabits();
  }, []);

  const getStreakCount = (habit: Habit) => {
    return Math.floor(Math.random() * 30);
  };

  const renderHabitItem = (item: Habit) => {
    console.log("Rendering habit:", item); // Added this line
    const streakCount = getStreakCount(item);
    const borderColor = item.type === "build" ? "border-green-500" : "border-red-500";
    const bgColor = item.type === "build" ? "bg-green-700" : "bg-red-700";

    return (
      <View
        key={item.id}
        className={`bg-gray-800 rounded-xl p-4 mb-4 border-l-4 ${borderColor}`}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white font-bold text-lg mb-1">
              {item.name}
            </Text>
            <Text className="text-gray-400 text-sm">
              Started on: {format(new Date(item.startDate), "MMM d, yyyy")}
            </Text>
            <View className="flex-row items-center mt-2">
              <MaterialCommunityIcons name="fire" size={16} color="#FCD34D" />
              <Text className="text-yellow-300 ml-1">
                {streakCount} day streak
              </Text>
            </View>
          </View>
          <View className="items-end">
            <View
              className={`px-3 py-1 rounded-full mb-2 ${
                item.type === "build" ? "bg-green-700" : "bg-red-700"
              }`}
            >
              <Text className="text-white text-xs font-semibold uppercase">
                {item.type}
              </Text>
            </View>
            <DeleteHabitButton habitId={item.id} />
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <MaterialCommunityIcons name="loading" size={48} color="#60A5FA" />
        <Text className="text-blue-400 text-lg mt-4">Loading habits...</Text>
      </View>
    );
  }

  const habitsForDate = getHabitsForDate(currentDate);

  return (
    <ScrollView
      className="flex-1  bg-gray-900"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row justify-between items-center mt-6 mb-4">
        <Text className="text-white text-2xl font-bold">My Habits</Text>
      </View>

      {isToday(currentDate) ? (
        <Text className="text-gray-400 mb-4">Today's Habits</Text>
      ) : (
        <Text className="text-gray-400 mb-4">
          Habits for {format(currentDate, "MMMM d, yyyy")}
        </Text>
      )}

      {habitsForDate.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-12">
          <Feather name="inbox" size={64} color="#4B5563" />
          <Text className="text-gray-500 text-lg mt-4 text-center">
            No habits for this date.{"\n"}Start by adding a new habit!
          </Text>
        </View>
      ) : (
        habitsForDate.map(renderHabitItem)
      )}
    </ScrollView>
  );
};

export default Habits;
