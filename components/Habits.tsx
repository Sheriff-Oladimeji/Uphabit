import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useHabitStore from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { Feather } from "@expo/vector-icons";
import DeleteHabitButton from './DeleteHabitButton';

interface Habit {
  id: string;
  name: string;
  type: 'build' | 'quit';
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

  const renderHabitItem = (item: Habit) => (
    <View key={item.id} className="bg-gray-800 rounded-lg p-4 mb-3 flex-row items-center">
      <View
        className={`w-2 h-12 rounded-full mr-4 ${
          item.type === "build" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <View className="flex-1">
        <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
        <Text className="text-gray-400 text-sm">
          Started on: {new Date(item.startDate).toLocaleDateString()}
        </Text>
      </View>
      <View
        className={`px-2 py-1 rounded mr-2 ${
          item.type === "build" ? "bg-green-700" : "bg-red-700"
        }`}
      >
        <Text className="text-white text-xs font-semibold uppercase">
          {item.type}
        </Text>
      </View>
      <DeleteHabitButton habitId={item.id} />
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Loading habits...</Text>
      </View>
    );
  }

  const habitsForDate = getHabitsForDate(currentDate);

  if (habitsForDate.length === 0) {
    return (
      <View className="flex-1 justify-center items-center mt-4">
        <Feather name="inbox" size={64} color="#4B5563" />
        <Text className="text-gray-500 text-lg mt-4 text-center">
          No habits for this date.{"\n"}Start by adding a new habit!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-white text-2xl font-bold mt-6 mb-4">My Habits</Text>
      {habitsForDate.map(renderHabitItem)}
    </View>
  );
};

export default Habits;
