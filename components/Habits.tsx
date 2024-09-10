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
  isCompleted: boolean;
  progress?: number;
  timeElapsed?: number;
}

const HabitItem = memo(({ item }: { item: Habit }) => {
  const { toggleHabitCompletion, updateHabitProgress } = useHabitStore();
  const [progress, setProgress] = useState(item.progress || 0);
  const [timeElapsed, setTimeElapsed] = useState(item.timeElapsed || 0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setProgress(item.progress || 0);
    setTimeElapsed(item.timeElapsed || 0);
  }, [item]);

  const isCompleted = item.isCompleted || 
    (item.habitType === 'amount' && progress >= item.target!) ||
    (item.habitType === 'duration' && timeElapsed >= item.target!);

  const borderColor =
    item.type === "build" ? "border-green-500" : "border-red-500";
  const bgColor = item.type === "build" ? "bg-green-700" : "bg-red-700";
  const accentColor = item.type === "build" ? "text-green-500" : "text-red-500";
 
  const handleTaskCompletion = () => {
    toggleHabitCompletion(item.id);
  };

  const handleAmountIncrement = () => {
    if (progress < item.target!) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateHabitProgress(item.id, newProgress);
      if (newProgress >= item.target!) {
        toggleHabitCompletion(item.id);
      }
    }
  };

  const handleDurationTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTimeElapsed = prev + 1;
          updateHabitProgress(item.id, newTimeElapsed);
          if (newTimeElapsed >= item.target!) {
            clearInterval(interval);
            setTimerRunning(false);
            toggleHabitCompletion(item.id);
            return item.target!;
          }
          return newTimeElapsed;
        });
      }, 1000);
    } else {
      setTimerRunning(false);
    }
  };

  const renderHabitTypeInfo = () => {
    switch (item.habitType) {
      case "task":
        return (
          <Text className="text-gray-400">
            {isCompleted ? "Completed" : "Not completed"}
          </Text>
        );
      case "amount":
        return (
          <Text className="text-gray-400">
            {progress}/{item.target} {item.unit}
          </Text>
        );
      case "duration":
        return (
          <Text className="text-gray-400">
            {format(new Date(timeElapsed * 1000), "mm:ss")}/
            {format(new Date(item.target! * 1000), "mm:ss")}
          </Text>
        );
      default:
        return null;
    }
  };

  const iconColor = isCompleted ? "#60A5FA" : "#374151";
  const initialLetter = item.name.charAt(0).toUpperCase();

  return (
    <View className="bg-gray-800 rounded-full p-2 mb-4 flex-row items-center justify-between ">
      {/* Left Icon with Initial */}
      <View className="flex-row items-center">
        <View className="bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center mr-4">
          <Text className="text-white text-lg font-bold">{initialLetter}</Text>
        </View>
        {/* Habit Details */}
        <View>
          <Text className="text-white font-bold text-lg">{item.name}</Text>
          {renderHabitTypeInfo()}
        </View>
      </View>

      {/* Right Side Button (Play, Plus, Check) */}
      {item.habitType === "duration" && (
        <TouchableOpacity onPress={handleDurationTimer}>
          <View className={`h-10 w-10 rounded-full flex items-center justify-center ${isCompleted ? 'bg-blue-500' : 'bg-gray-600'}`}>
            <AntDesign name={timerRunning ? "pause" : "play"} size={20} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {item.habitType === "amount" && (
        <TouchableOpacity onPress={handleAmountIncrement}>
          <View className={`h-10 w-10 rounded-full flex items-center justify-center ${isCompleted ? 'bg-blue-500' : 'bg-gray-600'}`}>
            <AntDesign name="plus" size={20} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {item.habitType === "task" && (
        <TouchableOpacity onPress={handleTaskCompletion}>
          <View
            className="h-10 w-10 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: iconColor }}
          >
            <AntDesign
              name={isCompleted ? "checkcircle" : "checkcircleo"}
              size={20}
              color={iconColor}
            />
          </View>
        </TouchableOpacity>
      )}
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
      className="mt-6 "
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
};

export default Habits;