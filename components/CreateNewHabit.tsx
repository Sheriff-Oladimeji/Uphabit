import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useCreateStore from "@/store/useCreateStore";
import { format, addYears, subYears } from "date-fns";
import useDateStore from "@/store/useDateStore";
const CreateNewHabit = () => {
  const {
    selectedOption,
    selectedTrackingOption,
    reminderTime,
    setReminderTime,
  } = useCreateStore();
  const [habitName, setHabitName] = useState("");
  const [amount, setAmount] = useState(1);
   const { currentDate } = useDateStore();
  const [timeHours, setTimeHours] = useState("0");
  const [timeMinutes, setTimeMinutes] = useState("5");
  const [timeSeconds, setTimeSeconds] = useState("0");
  const [showTimePicker, setShowTimePicker] = useState(false);
   const [startDate, setStartDate] = useState(currentDate);
    const minDate = subYears(new Date(), 1);
    const maxDate = addYears(new Date(), 1);

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
      reminderTime,
    });

    // Reset fields after saving
    setHabitName("");
    setAmount(1);
    setTimeHours("0");
    setTimeMinutes("5");
    setTimeSeconds("0");
    setReminderTime(new Date(new Date().getTime() + 10 * 60000));
  };

  const onChangeTime = ( selectedTime: any) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === "ios");
    setReminderTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
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
          Reminder Time
        </Text>
        <TouchableOpacity
          onPress={showTimepicker}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <Text className="text-white text-base">
            {reminderTime
              ? format(reminderTime, "hh:mm a")
              : "Set Reminder Time"}
          </Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showTimePicker}
            onRequestClose={() => setShowTimePicker(false)}
          >
            <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.7)]">
              <View className="bg-gray-700 p-4 rounded-lg w-4/5">
                <DateTimePicker
                  testID="iosTimePicker"
                  value={reminderTime || new Date()}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={onChangeTime}
                  textColor="white"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                />
                <TouchableOpacity
                  onPress={() => setShowTimePicker(false)}
                  className="mt-4 bg-blue-500 p-2 rounded-full"
                >
                  <Text className="text-white text-center">Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        {Platform.OS === "android" && showTimePicker && (
          <DateTimePicker
            testID="androidTimePicker"
            value={reminderTime || new Date()}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChangeTime}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        )}
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
