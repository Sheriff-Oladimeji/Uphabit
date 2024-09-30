import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useCreateStore from "@/store/useCreateStore";
import { format, addYears, subYears } from "date-fns";
import useDateStore from "@/store/useDateStore";
import InputField from "./InputField";
import TimeDurationInput from "./TimeDurationInput";
import CustomDateTimePicker from "./CustomDateTimePicker";
import RepeatBottomSheet, { RepeatConfig } from "./RepeatBottomSheet";

import useHabitStore from "@/store/useHabitStore"; 

import { Habit } from "@/store/useHabitStore";
import { BottomSheetProps } from "@/@types/bottomSheet";

const CreateHabit: React.FC<BottomSheetProps> = ({ onClose }) => {
  const {
    selectedOption,
    selectedTrackingOption,
    reminderTime,
    setReminderTime,
    startDate,
    setStartDate,
    repeatConfig,
    setRepeatConfig,
  } = useCreateStore();

  const { addHabit } = useHabitStore(); 

  const [habitName, setHabitName] = useState("");
  const [amount, setAmount] = useState(1);
  const { currentDate } = useDateStore();
  const [timeHours, setTimeHours] = useState("0");
  const [timeMinutes, setTimeMinutes] = useState("5");
  const [timeSeconds, setTimeSeconds] = useState("0");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
const [showRepeatBottomSheet, setShowRepeatBottomSheet] = useState(false);


  const handleSave = async () => {
    const newHabit: Habit = {
      id: Date.now().toString(), 
      name: habitName,
      trackingType: selectedTrackingOption || "", 
      amount: selectedTrackingOption === "amount" ? amount : undefined,
      time:
        selectedTrackingOption === "time"
          ? { hours: timeHours, minutes: timeMinutes, seconds: timeSeconds }
          : undefined,
    };

    await addHabit(newHabit); 

    
    setHabitName("");
    setAmount(1);
    setTimeHours("0");
    setTimeMinutes("5");
    setTimeSeconds("0");
    setReminderTime(new Date(new Date().getTime() + 10 * 60000));
    setStartDate(new Date());
    setRepeatConfig({ type: "daily" });
    onClose();
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === "ios");
    if (currentTime instanceof Date && !isNaN(currentTime.getTime())) {
      setReminderTime(currentTime);
    }
  };

  const onChangeStartDate = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" || Platform.OS === "android") {
      const currentDate = selectedDate || startDate;
      if (currentDate instanceof Date && !isNaN(currentDate.getTime())) {
        setStartDate(currentDate);
        setShowDatePicker(Platform.OS === "ios");
      }
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  };

  return (
    <View className="w-full px-4  bg-gray-900 rounded-lg">
      <Text className="text-white text-3xl font-bold text-center mb-6">
        {selectedOption === "build" ? "Create a New Habit" : "Quit a Bad Habit"}
      </Text>

      <InputField
        label="Habit Name"
        placeholder="Enter habit name"
        value={habitName}
        onChangeText={setHabitName}
      />

      {selectedTrackingOption === "amount" && (
        <InputField
          label="Amount to track"
          placeholder="Enter amount"
          value={String(amount)}
          onChangeText={(text) => setAmount(Number(text) || 1)}
          keyboardType="numeric"
        />
      )}

      {selectedTrackingOption === "time" && (
        <TimeDurationInput
          timeHours={timeHours}
          timeMinutes={timeMinutes}
          timeSeconds={timeSeconds}
          setTimeHours={setTimeHours}
          setTimeMinutes={setTimeMinutes}
          setTimeSeconds={setTimeSeconds}
        />
      )}

      <View className="mb-6">
        <Text className="text-gray-300 font-semibold text-lg mb-2">
          Reminder Time
        </Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <Text className="text-white text-base">
            {reminderTime
              ? format(reminderTime, "hh:mm a")
              : "Set Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-gray-300 font-semibold text-lg mb-2">
          Start Date
        </Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <Text className="text-white text-base">
            {format(startDate, "MMMM dd, yyyy")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-gray-300 font-semibold text-lg mb-2">Repeat</Text>
        <TouchableOpacity
          onPress={() => setShowRepeatBottomSheet(true)}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <Text className="text-white text-base">
            {repeatConfig.type === "daily" && "Daily"}
            {repeatConfig.type === "weekly" &&
              `Weekly (${repeatConfig.weekDays
                ?.map((d) => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][d])
                .join(", ")})`}
            {repeatConfig.type === "monthly" &&
              `Monthly (Day ${repeatConfig.monthDay})`}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-600 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">Save Habit</Text>
      </TouchableOpacity>

      <CustomDateTimePicker
        visible={showTimePicker}
        value={reminderTime}
        onChange={onChangeTime}
        mode="time"
        onClose={() => setShowTimePicker(false)}
      />

      <CustomDateTimePicker
        visible={showDatePicker}
        value={startDate}
        onChange={onChangeStartDate}
        mode="date"
        onClose={() => setShowDatePicker(false)}
      />

      <RepeatBottomSheet
        isVisible={showRepeatBottomSheet}
        onClose={() => setShowRepeatBottomSheet(false)}
        repeatConfig={repeatConfig}
        setRepeatConfig={(config) => setRepeatConfig(config)}
      />
    </View>
  );
};

export default CreateHabit;
