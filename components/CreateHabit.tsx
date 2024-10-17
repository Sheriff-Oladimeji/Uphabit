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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTab from "./BottomTab";
import { format } from "date-fns";
import InputField from "./InputField";
import CustomDateTimePicker from "./CustomDateTimePicker";
import RepeatBottomSheet from "./RepeatBottomSheet";
import CategoryBottomSheet from "./CategoryBottomSheet";
import useCreateStore from "../store/useCreateStore";
import { CategoryType } from "@/@types/habitTypes";

const CreateHabit = ({ isVisible, onClose }: BottomSheetProps) => {
  const {
    reminderTime,
    setReminderTime,
    repeatConfig,
    setRepeatConfig,
    motivation,
    setMotivation,
    category,
    setCategory,
    addHabit,
  } = useCreateStore();

  const [habitName, setHabitName] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRepeatBottomSheet, setShowRepeatBottomSheet] = useState(false);
  const [showCategoryBottomSheet, setShowCategoryBottomSheet] = useState(false);

  const getCategoryIcon = (category: CategoryType): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    const icons: Record<CategoryType, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
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
    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      motivation,
      reminderTime,
      repeatConfig,
      category,
    };

    await addHabit(newHabit);
    setHabitName("");
    setMotivation("");
    setCategory("other");
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
        <View className="flex flex-row items-center justify-between mb-4 pt-12">
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
          <InputField
            label="Motivation"
            placeholder="Why do you want to build this habit?"
            value={motivation}
            onChangeText={setMotivation}
            multiline={true}
            numberOfLines={4}
          />
          <View className="mb-6">
            <Text className="text-gray-300 font-semibold text-lg mb-2">
              Reminder
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
              Frequency
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
          className="bg-blue-600 w-[90%] rounded-md py-4"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-lg text-center ">
            Save Habit
          </Text>
        </TouchableOpacity>
      </BottomTab>
    </BottomSheet>
  );
};

export default CreateHabit;
