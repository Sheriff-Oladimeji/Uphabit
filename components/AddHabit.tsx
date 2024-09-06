import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useHabitStore, {
  RepeatFrequency,
  TimeOfDay,
} from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { format } from "date-fns";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface AddHabitFormProps {
  type: "build" | "quit";
  onClose: () => void;
}

export function AddHabitForm({ type, onClose }: AddHabitFormProps) {
  const { currentDate } = useDateStore();
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState("daily");
  const [timeOfDay, setTimeOfDay] = useState("anytime");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = async () => {
    if (habitName.trim()) {
      await addHabit({
        name: habitName.trim(),
        type,
        startDate: startDate.toISOString(),
        repeatFrequency: repeatFrequency as RepeatFrequency,
        timeOfDay: timeOfDay as TimeOfDay,
        reminderTime: reminderTime.toISOString(),
      });
      onClose();
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === "ios");
    setReminderTime(currentTime);
  };

  return (
    <View className="w-[90%] mx-auto bg-gray-800 py-6 rounded-lg shadow-lg">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => onClose()}>
          <AntDesign name="closecircleo" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark-done" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Habit Name */}
      <Text className="text-xl font-bold text-white mb-2">Habit Name</Text>
      <TextInput
        className="bg-gray-700 text-white p-4 rounded-lg mb-4 text-base"
        placeholder="Enter habit name"
        placeholderTextColor="#9ca3af"
        value={habitName}
        onChangeText={setHabitName}
      />

      {/* Start Date */}
      <Text className="text-xl font-bold text-white mb-2">Start Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="bg-gray-700 p-4 rounded-lg mb-4"
      >
        <Text className="text-white">
          Start habit on: {format(startDate, "MMM dd, yyyy")}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Repeat Frequency */}
      <Text className="text-xl font-bold text-white mb-2">Repeat</Text>
      <View className="flex-row space-x-2 mb-4">
        {["daily", "weekly", "monthly"].map((freq) => (
          <TouchableOpacity
            key={freq}
            onPress={() => setRepeatFrequency(freq)}
            className={`px-4 py-2 rounded-lg ${
              repeatFrequency === freq ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            <Text className="text-white capitalize">{freq}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time of Day */}
      <Text className="text-xl font-bold text-white mb-2">Time of Day</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {["anytime", "morning", "afternoon", "evening"].map((time) => (
          <TouchableOpacity
            key={time}
            onPress={() => setTimeOfDay(time)}
            className={`p-2 w-[48%] rounded-lg mb-2 ${
              timeOfDay === time ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            <Text className="text-white capitalize text-center">{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reminder Time */}
      <Text className="text-xl font-bold text-white mb-2">Reminder</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        className="bg-gray-700 p-4 rounded-lg mb-4"
      >
        <Text className="text-white">
          Set reminder: {format(reminderTime, "hh:mm a")}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timeTimePicker"
          value={reminderTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Add Habit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
