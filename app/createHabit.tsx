import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useHabitStore, {
  HabitType,
  RepeatFrequency,
  TimeOfDay,
} from "../store/useHabitStore";
import useDateStore from "@/store/useDateStore";
import { format, addYears } from "date-fns";
import Container from "@/components/Container";
import BottomTab from "@/components/BottomTab";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "../utils/notificationService";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const habitTypeIcons = {
  task: <AntDesign name="checkcircleo" size={20} color="white" />,
  amount: <MaterialCommunityIcons name="counter" size={20} color="white" />,
  duration: <AntDesign name="clockcircleo" size={20} color="white" />,
};

const timeOfDayIcons = {
  anytime: <Ionicons name="time-outline" size={20} color="white" />,
  morning: <Ionicons name="sunny-outline" size={20} color="white" />,
  afternoon: <Ionicons name="partly-sunny-outline" size={20} color="white" />,
  evening: <Ionicons name="moon-outline" size={20} color="white" />,
};

const Create: React.FC<{ type: string; onClose: () => void }> = ({ type, onClose }) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { currentDate } = useDateStore();
  const addHabit = useHabitStore((state) => state.addHabit);

  const [step, setStep] = useState(0);
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState("task");
  const [amount, setAmount] = useState("1");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("0");
  const [startDate, setStartDate] = useState(currentDate);
  const [repeatFrequency, setRepeatFrequency] = useState("daily");
  const [timeOfDay, setTimeOfDay] = useState("anytime");
  const [reminderTime, setReminderTime] = useState(
    new Date(Date.now() + 30 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date | null>(null); // Update type to accept Date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSave = async () => {
    if (habitName.trim()) {
      const durationInSeconds =
        habitType === "duration"
          ? parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
          : undefined;

      const habitData = {
        name: habitName.trim(),
        habitType,
        startDate: startDate.toISOString(),
        repeatFrequency: repeatFrequency as RepeatFrequency,
        timeOfDay: timeOfDay as TimeOfDay,
        reminderTime: reminderTime.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
        target: habitType === "amount" ? parseInt(amount) : durationInSeconds,
        unit:
          habitType === "amount"
            ? "times"
            : habitType === "duration"
            ? "seconds"
            : undefined,
        id: "", // Placeholder ID
        createdAt: new Date().toISOString(),
        completionDates: {},
        progressDates: {},
      };
      habitData.habitType = habitData.habitType as HabitType; // Ensure habitType is of type HabitType
      await addHabit(habitData);
      navigation.goBack();
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const steps = [
    {
      question: "What's the name of your habit?",
      component: (
        <TextInput
          className="bg-gray-700 text-white p-4 rounded-lg mb-4 text-base"
          placeholder="Enter habit name"
          placeholderTextColor="#9ca3af"
          value={habitName}
          onChangeText={setHabitName}
        />
      ),
    },
    {
      question: "How do you want to achieve this habit?",
      component: (
        <View className="flex-row space-x-2 mb-4">
          {["task", "amount", "duration"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setHabitType(type as HabitType)}
              className={`flex-1 py-2 rounded-lg ${
                habitType === type ? "bg-blue-500" : "bg-gray-700"
              }`}
            >
              <View className="flex-row items-center justify-center space-x-2">
                {habitTypeIcons[type as keyof typeof habitTypeIcons]} // Cast type to the keys of habitTypeIcons
                <Text className="text-white capitalize">{type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      question:
        habitType === "amount"
          ? "How many times do you want to do this?"
          : habitType === "duration"
          ? "How long do you want to do this?"
          : "When do you want to start?",
      component:
        habitType === "amount" ? (
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-lg text-base"
            placeholder="Enter amount"
            placeholderTextColor="#9ca3af"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        ) : habitType === "duration" ? (
          <View className="flex-row space-x-2">
            <View className="flex-1">
              <Text className="text-white mb-1">Hours</Text>
              <TextInput
                className="bg-gray-700 text-white p-4 rounded-lg text-base"
                value={hours}
                onChangeText={setHours}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Text className="text-white mb-1">Minutes</Text>
              <TextInput
                className="bg-gray-700 text-white p-4 rounded-lg text-base"
                value={minutes}
                onChangeText={setMinutes}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Text className="text-white mb-1">Seconds</Text>
              <TextInput
                className="bg-gray-700 text-white p-4 rounded-lg text-base"
                value={seconds}
                onChangeText={setSeconds}
                keyboardType="numeric"
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-gray-700 p-4 rounded-lg mb-4"
          >
            <Text className="text-white">
              Start habit on: {format(startDate, "MMM dd, yyyy")}
            </Text>
          </TouchableOpacity>
        ),
    },
    {
      question: "How often do you want to repeat this habit?",
      component: (
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
      ),
    },
    {
      question: "What time of day do you prefer?",
      component: (
        <View className="flex-row flex-wrap justify-between mb-4">
          {["anytime", "morning", "afternoon", "evening"].map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => setTimeOfDay(time)}
              className={`p-2 w-[48%] rounded-lg mb-2 ${
                timeOfDay === time ? "bg-blue-500" : "bg-gray-700"
              }`}
            >
              <View className="flex-row items-center justify-center space-x-2">
                {timeOfDayIcons[time as keyof typeof timeOfDayIcons]} // Cast time to the correct type
                <Text className="text-white capitalize">{time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      question: "When do you want to be reminded?",
      component: (
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="bg-gray-700 p-4 rounded-lg mb-4 flex-row justify-between items-center"
        >
          <Text className="text-white text-base">
            Set reminder: {format(reminderTime, "hh:mm a")}
          </Text>
          <Ionicons name="time-outline" size={20} color="white" />
        </TouchableOpacity>
      ),
    },
    {
      question: "When do you want to end this habit?",
      component: (
        <View className="flex-row space-x-2 mb-4">
          <TouchableOpacity
            onPress={() => setEndDate(null)}
            className={`px-4 py-2 rounded-lg ${
              endDate === null ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            <Text className="text-white">Never</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className={`px-4 py-2 rounded-lg ${
              endDate !== null ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            <Text className="text-white">
              {endDate ? format(endDate, "MMM dd, yyyy") : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  return (
    <View className="flex-1">
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          <Text className="text-2xl font-bold text-white mb-4">
            {steps[step].question}
          </Text>
          {steps[step].component}

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === "ios");
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          {Platform.OS === "ios" && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showTimePicker}
              onRequestClose={() => setShowTimePicker(false)}
            >
              <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.9)]">
                <View className="bg-white p-4 rounded-lg w-4/5">
                  <DateTimePicker
                    testID="iosTimePicker"
                    value={reminderTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={(event, selectedTime) => {
                      if (selectedTime) setReminderTime(selectedTime);
                    }}
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
              value={reminderTime}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setReminderTime(selectedTime);
              }}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate || addYears(new Date(), 1)}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(Platform.OS === "ios");
                if (selectedDate) setEndDate(selectedDate);
              }}
              minimumDate={new Date()}
            />
          )}
        </ScrollView>
      </Container>
      <BottomTab>
        <View className="flex-row justify-between w-full px-4">
          <TouchableOpacity
            className="bg-gray-500 rounded-lg py-3 px-6"
            onPress={handleBack}
            disabled={step === 0}
          >
            <Text className="text-white text-lg">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 px-6"
            onPress={handleNext}
          >
            <Text className="text-white text-lg">
              {step === steps.length - 1 ? "Create Habit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomTab>
    </View>
  );
};

export default Create;
