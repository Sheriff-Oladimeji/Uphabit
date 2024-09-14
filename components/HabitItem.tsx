import React, { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import useHabitStore, { Habit } from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import HabitOptions from "./HabitOptions";
import habit from "@/app/habit";

const HabitItem = memo(({ item, onDelete, onEdit }: { item: Habit; onDelete: (id: string) => void; onEdit: (habit: Habit) => void }) => {
  const { toggleHabitCompletion, updateHabitProgress } = useHabitStore();
  const { currentDate } = useDateStore();
  const dateKey = format(currentDate, 'yyyy-MM-dd');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [progress, setProgress] = useState(item.progressDates?.[dateKey] ?? 0);
  const [timeElapsed, setTimeElapsed] = useState(item.progressDates?.[dateKey] ?? 0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setProgress(item.progressDates?.[dateKey] ?? 0);
    setTimeElapsed(item.progressDates?.[dateKey] ?? 0);
  }, [item, dateKey]);

  const isCompleted = item.completionDates?.[dateKey] ?? false;

  const handleTaskCompletion = () => {
    toggleHabitCompletion(item.id, currentDate);
  };

  const handleAmountIncrement = () => {
    if (progress < item.target!) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateHabitProgress(item.id, newProgress, currentDate);
      if (newProgress >= item.target!) {
        toggleHabitCompletion(item.id, currentDate);
      }
    }
  };

  const handleDurationTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const interval = setInterval(() => {
        setTimeElapsed((prev: number) => {
          const newTimeElapsed = prev + 1;
          updateHabitProgress(item.id, newTimeElapsed, currentDate);
          if (newTimeElapsed >= item.target!) {
            clearInterval(interval);
            setTimerRunning(false);
            toggleHabitCompletion(item.id, currentDate);
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
    <TouchableOpacity 
  
      onPress={() => router.push("/habit")}
          onLongPress={() => setIsModalVisible(true)}
          className="bg-gray-800 rounded-full p-2 mb-4 flex flex-row justify-between items-center"
    >
      {/* Left Icon with Initial */}
      <View className="flex-row items-center">
        <View className="bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center mr-4">
          <Text className="text-white text-lg font-bold">{initialLetter}</Text>
        </View>
        {/* Habit Details */}
        <View>
          <Text className="text-white font-bold text-lg max-w-[200px]">{item.name}</Text>
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
      <HabitOptions 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        onDelete={() => onDelete(item.id)}
        onEdit={() => onEdit(item)}
        name={item.name}
      />
    </TouchableOpacity>
  );
});



export default HabitItem;
