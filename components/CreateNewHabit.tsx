import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated import
import useCreateStore from "@/store/useCreateStore";

const CreateNewHabit = () => {
  const { selectedOption, selectedTrackingOption } = useCreateStore();
  const [habitName, setHabitName] = useState("");
  const [amount, setAmount] = useState(1); // Default amount as a number
  const [timeHours, setTimeHours] = useState("0"); // Default hours
  const [timeMinutes, setTimeMinutes] = useState("5"); // Default minutes
  const [timeSeconds, setTimeSeconds] = useState("0"); // Default seconds

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
    });

    // Reset fields after saving
    setHabitName("");
    setAmount(1);
    setTimeHours("0");
    setTimeMinutes("5");
    setTimeSeconds("0");
  };

  const incrementAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decrementAmount = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  return (
    <View className="p-5">
      <Text className="text-white text-lg mb-2">
        {selectedOption === "build" ? "Create a New Habit" : "Quit a Habit"}
      </Text>

      <TextInput
        placeholder="Habit Name"
        value={habitName}
        onChangeText={setHabitName}
        className="bg-white p-3 rounded-lg mb-3"
      />


      {/* <Text className="text-white mb-2">
        Tracking Type: {selectedTrackingOption}
      </Text> */}

      {selectedTrackingOption === "amount" && (
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={decrementAmount}
            className="p-3 bg-green-500 rounded-lg"
          >
            <Text className="text-white text-lg">-</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Amount to Track"
            value={String(amount)} // Convert number to string for TextInput
            onChangeText={(text) => setAmount(Number(text) || 1)} // Convert back to number
            keyboardType="numeric"
            className="bg-white p-3 rounded-lg mx-3 text-center w-24"
          />
          <TouchableOpacity
            onPress={incrementAmount}
            className="p-3 bg-green-500 rounded-lg"
          >
            <Text className="text-white text-lg">+</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTrackingOption === "time" && (
        <View>
          <Text className="text-white mb-2">Duration (HH:MM:SS):</Text>
          <View className="flex-row justify-between">
            <TextInput
              placeholder="Hours"
              value={timeHours}
              onChangeText={setTimeHours}
              keyboardType="numeric"
              className="bg-white p-3 rounded-lg mb-3 w-24 text-center"
            />
            <TextInput
              placeholder="Minutes"
              value={timeMinutes}
              onChangeText={setTimeMinutes}
              keyboardType="numeric"
              className="bg-white p-3 rounded-lg mb-3 w-24 text-center"
            />
            <TextInput
              placeholder="Seconds"
              value={timeSeconds}
              onChangeText={setTimeSeconds}
              keyboardType="numeric"
              className="bg-white p-3 rounded-lg mb-3 w-24 text-center"
            />
          </View>
        </View>
      )}

      <Button title="Save" onPress={handleSave} color="#10B981" />
    </View>
  );
};

export default CreateNewHabit;
