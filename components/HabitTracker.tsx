import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CategoryType } from "@/@types/habitTypes";
import { format, eachDayOfInterval, subDays, isToday } from "date-fns";

interface HabitTrackerProps {
  id: string;
  name: string;
  category: CategoryType;
  onToggle: (date: string) => void;
  progress: Array<{ date: string; completed: boolean }>;
}

const getCategoryIcon = (
  category: CategoryType
): React.ComponentProps<typeof MaterialCommunityIcons>["name"] => {
  const icons: Record<
    CategoryType,
    React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  > = {
    sport: "basketball",
    health: "heart-pulse",
    work: "briefcase",
    finance: "cash",
    social: "account-group",
    fun: "gamepad-variant",
    other: "dots-horizontal",
  };
  return icons[category];
};

const HabitTracker: React.FC<HabitTrackerProps> = ({
  id,
  name,
  category,
  onToggle,
  progress,
}) => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 27),
    end: today,
  });

  console.log("Rendering habit:", name, "with progress:", progress); // Debug log

  const getSquareColor = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const progressEntry = progress.find((p) => p.date === dateStr);

    if (progressEntry?.completed) {
      return "bg-green-500";
    }
    return "bg-gray-800";
  };

  return (
    <View className="mb-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-gray-800 items-center justify-center mr-2">
            <MaterialCommunityIcons
              name={getCategoryIcon(category)}
              size={20}
              color="white"
            />
          </View>
          <Text className="text-white text-lg font-semibold">{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onToggle(format(today, "yyyy-MM-dd"))}
          className={`p-2 rounded-full ${
            progress.find((p) => p.date === format(today, "yyyy-MM-dd"))
              ?.completed
              ? "bg-green-500"
              : "bg-gray-800"
          }`}
        >
          <MaterialCommunityIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap gap-1">
        {days.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onToggle(format(date, "yyyy-MM-dd"))}
            className={`w-6 h-6 rounded-sm ${getSquareColor(date)} 
              ${isToday(date) ? "border border-gray-500" : ""}`}
          />
        ))}
      </View>
    </View>
  );
};

export default HabitTracker;
