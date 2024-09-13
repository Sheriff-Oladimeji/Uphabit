import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import useHabitStore, { Habit } from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import HabitItem from "./HabitItem";

const Habits = () => {
  const { habits, loadHabits, getHabitsForDate, deleteHabit } = useHabitStore();
  const { currentDate } = useDateStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHabits().then(() => setIsLoading(false));
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      deleteHabit(id);
    },
    [deleteHabit]
  );

  const renderItem: ListRenderItem<Habit> = useCallback(
    ({ item }) => <HabitItem item={item} onDelete={handleDelete} />,
    [handleDelete]
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
      className="mt-6 "
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
};

export default Habits;
