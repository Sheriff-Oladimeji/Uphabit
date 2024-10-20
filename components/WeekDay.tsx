import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, isToday, isBefore } from "date-fns";

interface WeekDayProps {
  date: Date;
  isCompleted: boolean;
  onPress: () => void;
  disabled: boolean;
  startDate: Date;
}

const WeekDay: React.FC<WeekDayProps> = ({
  date,
  isCompleted,
  onPress,
  disabled,
  startDate,
}) => {
  const dayColor = isCompleted ? "bg-green-500" : "bg-gray-800";
  const dayName = format(date, "EEE");
  const dayNumber = format(date, "d");
  const monthName = format(date, "MMM");
  const isCurrentDay = isToday(date);

  // Disable dates before start date
  const isBeforeStart = isBefore(date, startDate);
  const finalDisabled = disabled || isBeforeStart;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={finalDisabled}
      className={`items-center px-1`}
    >
      <Text className="text-gray-400 text-xs mb-1">{dayName}</Text>
      <View
        className={`w-9 h-9 rounded-full ${dayColor} items-center justify-center
          ${isCurrentDay ? "border-2 border-purple-500" : ""}`}
      >
        <Text className="text-white text-sm">{dayNumber}</Text>
        {isCompleted && (
          <View className="absolute bottom-0 right-0">
            <MaterialCommunityIcons
              name="check-circle"
              size={12}
              color="#fff"
            />
          </View>
        )}
      </View>
      <Text className="text-gray-400 text-xs mt-1">{monthName}</Text>
    </TouchableOpacity>
  );
};

export default WeekDay;

