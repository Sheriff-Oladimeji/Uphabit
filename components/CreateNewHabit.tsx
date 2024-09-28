import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useCreateStore from "@/store/useCreateStore";

const CreateNewHabit = () => {
  const { selectedOption, selectedTrackingOption } = useCreateStore();
  const [habitName, setHabitName] = useState("");
  const [amount, setAmount] = useState(1);
  const [timeHours, setTimeHours] = useState("0");
  const [timeMinutes, setTimeMinutes] = useState("5");
  const [timeSeconds, setTimeSeconds] = useState("0");
  const [reminder, setReminder] = useState("");

  const handleSave = () => {
    console.log({
      habitName,
      trackingType: selectedTrackingOption,
      amount: selectedTrackingOption === "amount" ? amount : undefined,
      time:
        selectedTrackingOption === "time"
          ? { hours: timeHours, minutes: timeMinutes, seconds: timeSeconds }
          : undefined,
      selectedOption,
      reminder,
    });

    // Reset fields after saving
    setHabitName("");
    setAmount(1);
    setTimeHours("0");
    setTimeMinutes("5");
    setTimeSeconds("0");
    setReminder("");
  };

  return (
    <View className="w-full px-4 py-6 bg-gray-900 rounded-lg">
      <Text className="text-white text-3xl font-bold text-center mb-6">
        {selectedOption === "build" ? "Create a New Habit" : "Quit a Bad Habit"}
      </Text>

      <View className="mb-6">
        <Text className="text-gray-300 font-semibold text-lg mb-2">
          Habit Name
        </Text>
        <TextInput
          placeholder="Enter habit name"
          placeholderTextColor="#4B5563"
          value={habitName}
          onChangeText={setHabitName}
          className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700"
        />
      </View>

      {selectedTrackingOption === "amount" && (
        <View className="mb-6">
          <Text className="text-gray-300 font-semibold text-lg mb-2">
            Amount to track
          </Text>
          <TextInput
            placeholder="Enter amount"
            placeholderTextColor="#4B5563"
            value={String(amount)}
            onChangeText={(text) => setAmount(Number(text) || 1)}
            keyboardType="numeric"
            className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-full"
          />
        </View>
      )}

      {selectedTrackingOption === "time" && (
        <View className="mb-6">
          <Text className="text-gray-300 font-semibold text-lg mb-2">
            Duration (HH:MM:SS)
          </Text>
          <View className="flex-row justify-between">
            <TextInput
              placeholder="HH"
              placeholderTextColor="#4B5563"
              value={timeHours}
              onChangeText={setTimeHours}
              keyboardType="numeric"
              className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
            />
            <TextInput
              placeholder="MM"
              placeholderTextColor="#4B5563"
              value={timeMinutes}
              onChangeText={setTimeMinutes}
              keyboardType="numeric"
              className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
            />
            <TextInput
              placeholder="SS"
              placeholderTextColor="#4B5563"
              value={timeSeconds}
              onChangeText={setTimeSeconds}
              keyboardType="numeric"
              className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700 w-[30%] text-center"
            />
          </View>
        </View>
      )}

      <View className="mb-6">
        <Text className="text-gray-300 font-semibold text-lg mb-2">
          Reminder
        </Text>
        <TextInput
          placeholder="Set a reminder (e.g., Daily at 9 AM)"
          placeholderTextColor="#4B5563"
          value={reminder}
          onChangeText={setReminder}
          className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-600 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">Save Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewHabit;
