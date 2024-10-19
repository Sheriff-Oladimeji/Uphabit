// components/CreateHabit.tsx
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTab from "./BottomTab";
import { format } from "date-fns";
import InputField from "./InputField";
import CustomDateTimePicker from "./CustomDateTimePicker";
import CategoryBottomSheet from "./CategoryBottomSheet";
import useCreateStore from "../store/useCreateStore";
import { CategoryType } from "@/@types/habitTypes";
import StreakGoal from "./StreakGoal";

const CreateHabit = ({ isVisible, onClose }: BottomSheetProps) => {
  const {
    reminderTime,
    setReminderTime,
    motivation,
    setMotivation,
    category,
    setCategory,
    streakGoal,
    setStreakGoal,
    addHabit,
  } = useCreateStore();

  const [habitName, setHabitName] = useState("");
  const [hasStreakGoal, setHasStreakGoal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCategoryBottomSheet, setShowCategoryBottomSheet] = useState(false);

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

  const handleSave = async () => {
    if (!habitName) {
      return;
    }
    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      motivation,
      reminderTime,
      category,
      streakGoal: hasStreakGoal ? streakGoal : null,
      currentStreak: 0,
      startDate: new Date(),
    };

    await addHabit(newHabit);

    setHabitName("");
    setMotivation("");
    setCategory("other");
    setStreakGoal(null);
    setHasStreakGoal(false);
    setReminderTime(new Date(new Date().getTime() + 10 * 60000));
    onClose();
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === "ios");
    if (currentTime instanceof Date && !isNaN(currentTime.getTime())) {
      setReminderTime(currentTime);
    }
  };

  const isButtonDisabled = habitName.trim() === "";

  return (
    <BottomSheet
      onClose={onClose}
      isVisible={isVisible}
      height={Platform.OS === "ios" ? "80%" : "95%"}
      radius={25}
    >
      <View className="w-[90%] mx-auto flex-1 pb-20">
        <View className="flex flex-row items-center justify-between mb-4 pt-10">
          <Text className="text-white text-xl font-bold">Create Habit</Text>
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
            label="Motivation (Optional)"
            placeholder="Why do you want to build this habit?"
            value={motivation}
            onChangeText={setMotivation}
            multiline
            numberOfLines={3}
          />

          <View className="mb-6">
            <Text className="text-gray-300 font-semibold text-lg mb-2">
              Category
            </Text>
            <TouchableOpacity
              onPress={() => setShowCategoryBottomSheet(true)}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex-row items-center"
            >
              <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center mr-2">
                <MaterialCommunityIcons
                  name={getCategoryIcon(category)}
                  size={20}
                  color="white"
                />
              </View>
              <Text className="text-white text-base capitalize">
                {category}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-gray-300 font-semibold text-lg mb-2">
              Reminder
            </Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex-row items-center justify-between"
            >
              <Text className="text-white text-base">
                {reminderTime
                  ? format(reminderTime, "hh:mm a")
                  : "Set Reminder Time"}
              </Text>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <StreakGoal
            hasStreakGoal={hasStreakGoal}
            setHasStreakGoal={setHasStreakGoal}
            streakGoal={streakGoal}
            setStreakGoal={setStreakGoal}
          />

          <CustomDateTimePicker
            visible={showTimePicker}
            value={reminderTime}
            onChange={onChangeTime}
            mode="time"
            onClose={() => setShowTimePicker(false)}
          />

          <CategoryBottomSheet
            isVisible={showCategoryBottomSheet}
            onClose={() => setShowCategoryBottomSheet(false)}
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        </ScrollView>
      </View>
      <BottomTab>
        <TouchableOpacity
          className={`w-[90%] rounded-md py-4 ${
            Platform.OS === "ios" ? "mb-4" : "mb-2"
          }  bg-blue-600`}
          onPress={handleSave}
          disabled={isButtonDisabled}
        >
          <Text className="font-bold text-lg text-center text-white">
            Save Habit
          </Text>
        </TouchableOpacity>
      </BottomTab>
    </BottomSheet>
  );
};

export default CreateHabit;
