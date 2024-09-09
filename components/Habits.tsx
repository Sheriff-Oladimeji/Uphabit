import React, { useEffect, useState, useCallback, memo } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import useHabitStore, { HabitType } from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DeleteHabitButton from "./DeleteHabitButton";
import { format, isToday } from "date-fns";

interface Habit {
  id: string;
  name: string;
  type: "build" | "quit";
  habitType: HabitType;
  startDate: string;
  target?: number;
  unit?: string;
}

const HabitItem = memo(({ item }: { item: Habit }) => {
  const streakCount = Math.floor(Math.random() * 30); // Placeholder for actual streak logic
  const borderColor = item.type === "build" ? "border-green-500" : "border-red-500";
  const bgColor = item.type === "build" ? "bg-green-700" : "bg-red-700";

  const renderHabitTypeInfo = () => {
    switch (item.habitType) {
      case 'task':
        return <Text className="text-gray-400 text-sm">Task-based habit</Text>;
      case 'amount':
        return <Text className="text-gray-400 text-sm">Target: {item.target} {item.unit}</Text>;
      case 'duration':
        return <Text className="text-gray-400 text-sm">Duration: {item.target} {item.unit}</Text>;
      default:
        return null;
    }
  };

  return (
    <View className={`bg-gray-800 rounded-xl p-4 mb-4 border-l-4 ${borderColor}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
          {renderHabitTypeInfo()}
          <Text className="text-gray-400 text-sm mt-1">
            Started: {format(new Date(item.startDate), "MMM d, yyyy")}
          </Text>
          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons name="fire" size={16} color="#FCD34D" />
            <Text className="text-yellow-300 ml-1">{streakCount} day streak</Text>
          </View>
        </View>
        <View className="items-end">
          <View className={`px-3 py-1 rounded-full ${bgColor}`}>
            <Text className="text-white text-xs font-semibold uppercase">{item.type}</Text>
          </View>
          <DeleteHabitButton habitId={item.id} />
        </View>
      </View>
    </View>
  );
});

const Habits = () => {
  const { habits, loadHabits, getHabitsForDate } = useHabitStore();
  const { currentDate } = useDateStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHabits().then(() => setIsLoading(false));
  }, []);

  const renderItem: ListRenderItem<Habit> = useCallback(
    ({ item }) => <HabitItem item={item} />,
    []
  );
  const keyExtractor = useCallback((item: Habit) => item.id, []);

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
    <FlatList
      data={habitsForDate}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
 
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center ">
          <Feather name="inbox" size={64} color="#4B5563" />
          <Text className="text-gray-500 text-lg mt-4 text-center">
            No habits for this date.{"\n"}Start by adding a new habit!
          </Text>
        </View>
      }
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="mt-12"
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
};

export default Habits;
