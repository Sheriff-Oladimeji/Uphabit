import React, { useEffect, useState, useCallback, memo } from "react";
import { View, Text, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import useHabitStore, { HabitType } from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
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
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const borderColor = item.type === "build" ? "border-green-500" : "border-red-500";
  const bgColor = item.type === "build" ? "bg-green-700" : "bg-red-700";

  const handleTaskCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  const handleAmountIncrement = () => {
    if (progress < item.target!) {
      setProgress(progress + 1);
      if (progress + 1 === item.target) {
        setIsCompleted(true);
      }
    }
  };

  const handleDurationTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const interval = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev + 1 >= item.target!) {
            clearInterval(interval);
            setTimerRunning(false);
            setIsCompleted(true);
            return item.target!;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setTimerRunning(false);
    }
  };

  const renderHabitTypeInfo = () => {
    switch (item.habitType) {
      case 'task':
        return (
          <TouchableOpacity onPress={handleTaskCompletion} className="mt-2">
            <View className={`flex-row items-center ${isCompleted ? 'bg-green-500' : 'bg-gray-700'} p-2 rounded-lg`}>
              <AntDesign name={isCompleted ? "checkcircle" : "checkcircleo"} size={24} color="white" />
              <Text className="text-white ml-2">{isCompleted ? "Completed" : "Mark as complete"}</Text>
            </View>
          </TouchableOpacity>
        );
      case 'amount':
        return (
          <View className="mt-2">
            <Text className="text-gray-400 text-sm">Progress: {progress} / {item.target} {item.unit}</Text>
            <TouchableOpacity onPress={handleAmountIncrement} className="bg-blue-500 p-2 rounded-lg mt-1">
              <Text className="text-white text-center">Increment</Text>
            </TouchableOpacity>
          </View>
        );
      case 'duration':
        return (
          <View className="mt-2">
            <Text className="text-gray-400 text-sm">Duration: {timeElapsed} / {item.target} seconds</Text>
            <TouchableOpacity onPress={handleDurationTimer} className={`${timerRunning ? 'bg-red-500' : 'bg-blue-500'} p-2 rounded-lg mt-1`}>
              <Text className="text-white text-center">{timerRunning ? "Stop Timer" : "Start Timer"}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className={`bg-gray-800 rounded-xl p-4 mb-4 border-l-4 ${borderColor}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
          <Text className="text-gray-400 text-sm">
            Started: {format(new Date(item.startDate), "MMM d, yyyy")}
          </Text>
          {renderHabitTypeInfo()}
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
