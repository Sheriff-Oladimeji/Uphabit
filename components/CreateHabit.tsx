import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import { BottomSheetProps } from "@/@types/bottomSheet";
import { AntDesign } from "@expo/vector-icons";
import BottomTab from "./BottomTab";
import { format } from "date-fns";
import InputField from "./InputField";
import CustomDateTimePicker from "./CustomDateTimePicker";
import RepeatBottomSheet from "./RepeatBottomSheet";
import useCreateStore from "@/store/useCreateStore";

const CreateHabit = ({ isVisible, onClose }: BottomSheetProps) => {
  const {
    reminderTime,
    setReminderTime,
    repeatConfig,
    setRepeatConfig,
    addHabit,
  } = useCreateStore();

  const [habitName, setHabitName] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRepeatBottomSheet, setShowRepeatBottomSheet] = useState(false);

  const handleSave = async () => {
    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      reminderTime,
      repeatConfig,
    };

    await addHabit(newHabit);
    setHabitName("");
    setReminderTime(new Date(new Date().getTime() + 10 * 60000));
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

  return (
    <BottomSheet
      onClose={onClose}
      isVisible={isVisible}
      height="100%"
      radius={25}
    >
      <View className="w-[90%] mx-auto flex-1 pb-20">
        <View className="flex flex-row items-center justify-between mb-4 pt-10">
          <Text className="text-white text-lg font-bold">Create Habit</Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />

          <InputField
            label="Motivation"
            placeholder=""
            value={habitName}
            onChangeText={setHabitName}
            multiline={true}
            numberOfLines={5}
          />

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
              Repeat
            </Text>
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

          <CustomDateTimePicker
            visible={showTimePicker}
            value={reminderTime}
            onChange={onChangeTime}
            mode="time"
            onClose={() => setShowTimePicker(false)}
          />

          <RepeatBottomSheet
            isVisible={showRepeatBottomSheet}
            onClose={() => setShowRepeatBottomSheet(false)}
            repeatConfig={repeatConfig}
            setRepeatConfig={setRepeatConfig}
          />
        </ScrollView>
      </View>
      <BottomTab>
        <TouchableOpacity
          className="bg-blue-600 w-[90%] rounded-md p-4"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-base text-center">
            Save Habit
          </Text>
        </TouchableOpacity>
      </BottomTab>
    </BottomSheet>
  );
};

export default CreateHabit;
