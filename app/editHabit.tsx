// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
//   Modal,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import useHabitStore, {
//   HabitType,
//   RepeatFrequency,
//   TimeOfDay,
//   Habit,
// } from "../store/useJunkStore";
// import useDateStore from "@/store/useDateStore";
// import { format, addYears, parseISO } from "date-fns";
// import Container from "@/components/Container";
// import BottomTab from "@/components/BottomTab";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { useNavigation } from "@react-navigation/native";
// import {
//   AntDesign,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";

// const EditHabit = () => {
//   const router = useRouter();
//   const navigation = useNavigation();
//   const { currentDate } = useDateStore();
//   const { id } = useLocalSearchParams();
//   const { habits, updateHabit } = useHabitStore();

//   const habit = habits.find((h) => h.id === id) as Habit;

//   const [habitName, setHabitName] = useState(habit.name);
//   const [startDate, setStartDate] = useState(parseISO(habit.startDate));
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [repeatFrequency, setRepeatFrequency] = useState(habit.repeatFrequency);
//   const [timeOfDay, setTimeOfDay] = useState(habit.timeOfDay);
//   const [reminderTime, setReminderTime] = useState(
//     parseISO(habit.reminderTime)
//   );
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [endDate, setEndDate] = useState<Date | null>(
//     habit.endDate ? parseISO(habit.endDate) : null
//   );
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);
//   const [habitType, setHabitType] = useState<HabitType>(habit.habitType);
//   const [amount, setAmount] = useState(habit.target?.toString() || "1");
//   const [hours, setHours] = useState("0");
//   const [minutes, setMinutes] = useState("0");
//   const [seconds, setSeconds] = useState("0");

//   useEffect(() => {
//     if (habit.habitType === "duration" && habit.target) {
//       const totalSeconds = habit.target;
//       setHours(Math.floor(totalSeconds / 3600).toString());
//       setMinutes(Math.floor((totalSeconds % 3600) / 60).toString());
//       setSeconds((totalSeconds % 60).toString());
//     }
//   }, [habit]);

//   const handleSave = async () => {
//     if (habitName.trim()) {
//       const durationInSeconds =
//         habitType === "duration"
//           ? parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
//           : undefined;

//       await updateHabit(habit.id, {
//         name: habitName.trim(),
//         type: habit.type,
//         habitType,
//         startDate: startDate.toISOString(),
//         repeatFrequency: repeatFrequency as RepeatFrequency,
//         timeOfDay: timeOfDay as TimeOfDay,
//         reminderTime: reminderTime.toISOString(),
//         endDate: endDate ? endDate.toISOString() : null,
//         target: habitType === "amount" ? parseInt(amount) : durationInSeconds,
//         unit:
//           habitType === "amount"
//             ? "times"
//             : habitType === "duration"
//             ? "seconds"
//             : undefined,
//       });
//       navigation.goBack();
//     }
//   };

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={handleSave} style={{ marginRight: 15 }}>
//           <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
//         </TouchableOpacity>
//       ),
//     });
//   }, [
//     navigation,
//     habitName,
//     startDate,
//     repeatFrequency,
//     timeOfDay,
//     reminderTime,
//     endDate,
//   ]);

//   const onDateChange = (event: any, selectedDate?: Date) => {
//     const currentDate = selectedDate || startDate;
//     setShowDatePicker(Platform.OS === "ios");
//     setStartDate(currentDate);
//   };

//   const onTimeChange = (event: any, selectedTime?: Date) => {
//     const currentTime = selectedTime || reminderTime;
//     setShowTimePicker(Platform.OS === "ios");
//     setReminderTime(currentTime);
//   };

//   const onEndDateChange = (event: any, selectedDate?: Date) => {
//     setShowEndDatePicker(Platform.OS === "ios");
//     setEndDate(selectedDate || null);
//   };

//   const habitTypeIcons = {
//     task: <AntDesign name="checkcircleo" size={20} color="white" />,
//     amount: <MaterialCommunityIcons name="counter" size={20} color="white" />,
//     duration: <AntDesign name="clockcircleo" size={20} color="white" />,
//   };

//   const timeOfDayIcons = {
//     anytime: <Ionicons name="time-outline" size={20} color="white" />,
//     morning: <Ionicons name="sunny-outline" size={20} color="white" />,
//     afternoon: <Ionicons name="partly-sunny-outline" size={20} color="white" />,
//     evening: <Ionicons name="moon-outline" size={20} color="white" />,
//   };

//   return (
//     <View className="flex-1">
//       <Container>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 70 }}
//         >
//           {/* Habit Name */}
//           <Text className="text-xl font-bold text-white mb-2">Habit Name</Text>
//           <TextInput
//             className="bg-gray-700 text-white p-4 rounded-lg= mb-4 text-base"
//             placeholder="Enter habit name"
//             placeholderTextColor="#9ca3af"
//             value={habitName}
//             onChangeText={setHabitName}
//           />

//           {/* Habit Type */}
//           <Text className="text-xl font-bold text-white mb-2">Habit Type</Text>
//           <View className="flex-row space-x-2 mb-4">
//             {["task", "amount", "duration"].map((type) => (
//               <TouchableOpacity
//                 key={type}
//                 onPress={() => setHabitType(type as HabitType)}
//                 className={`flex-1 py-2 rounded-lg ${
//                   habitType === type ? "bg-blue-500" : "bg-gray-700"
//                 }`}
//               >
//                 <View className="flex-row items-center justify-center space-x-2">
//                   {habitTypeIcons[type as keyof typeof habitTypeIcons]}
//                   <Text className="text-white capitalize">{type}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Amount Input (for amount habit type) */}
//           {habitType === "amount" && (
//             <View className="mb-4">
//               <Text className="text-xl font-bold text-white mb-2">Amount</Text>
//               <TextInput
//                 className="bg-gray-700 text-white p-4 rounded-lg text-base"
//                 placeholder="Enter amount"
//                 placeholderTextColor="#9ca3af"
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//               />
//             </View>
//           )}

//           {/* Duration Input (for duration habit type) */}
//           {habitType === "duration" && (
//             <View className="mb-4">
//               <Text className="text-xl font-bold text-white mb-2">
//                 Duration
//               </Text>
//               <View className="flex-row space-x-2">
//                 <View className="flex-1">
//                   <Text className="text-white mb-1">Hours</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-lg text-base"
//                     value={hours}
//                     onChangeText={setHours}
//                     keyboardType="numeric"
//                   />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="text-white mb-1">Minutes</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-lg text-base"
//                     value={minutes}
//                     onChangeText={setMinutes}
//                     keyboardType="numeric"
//                   />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="text-white mb-1">Seconds</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-lg text-base"
//                     value={seconds}
//                     onChangeText={setSeconds}
//                     keyboardType="numeric"
//                   />
//                 </View>
//               </View>
//             </View>
//           )}

//           {/* Start Date */}
//           <Text className="text-xl font-bold text-white mb-2">Start Date</Text>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             className="bg-gray-700 p-4 rounded-lg mb-4"
//           >
//             <Text className="text-white">
//               Start habit on: {format(startDate, "MMM dd, yyyy")}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={startDate}
//               mode="date"
//               is24Hour={true}
//               display="default"
//               onChange={onDateChange}
//             />
//           )}

//           {/* Repeat Frequency */}
//           <Text className="text-xl font-bold text-white mb-2">Repeat</Text>
//           <View className="flex-row space-x-2 mb-4">
//             {["daily", "weekly", "monthly"].map((freq) => (
//               <TouchableOpacity
//                 key={freq}
//                 onPress={() => setRepeatFrequency(freq as RepeatFrequency)}
//                 className={`px-4 py-2 rounded-lg ${
//                   repeatFrequency === freq ? "bg-blue-500" : "bg-gray-700"
//                 }`}
//               >
//                 <Text className="text-white capitalize">{freq}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Time of Day */}
//           <Text className="text-xl font-bold text-white mb-2">Time of Day</Text>
//           <View className="flex-row flex-wrap justify-between mb-4">
//             {["anytime", "morning", "afternoon", "evening"].map((time) => (
//               <TouchableOpacity
//                 key={time}
//                 onPress={() => setTimeOfDay(time as TimeOfDay)}
//                 className={`p-2 w-[48%] rounded-lg mb-2 ${
//                   timeOfDay === time ? "bg-blue-500" : "bg-gray-700"
//                 }`}
//               >
//                 <View className="flex-row items-center justify-center space-x-2">
//                   {timeOfDayIcons[time as keyof typeof timeOfDayIcons]}
//                   <Text className="text-white capitalize">{time}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View>
//             {/* Reminder Time */}
//             <Text className="text-xl font-bold text-white mb-2">Reminder</Text>

//             {/* Touchable to open DateTimePicker */}
//             <TouchableOpacity
//               onPress={() => setShowTimePicker(true)}
//               className="bg-gray-700 p-4 rounded-lg mb-4 flex-row justify-between items-center"
//             >
//               <Text className="text-white text-base">
//                 Set reminder: {format(reminderTime, "hh:mm a")}
//               </Text>
//               <Ionicons name="time-outline" size={20} color="white" />
//             </TouchableOpacity>

//             {/* iOS Custom Modal for DateTimePicker */}
//             {Platform.OS === "ios" && (
//               <Modal
//                 transparent={true}
//                 animationType="slide"
//                 visible={showTimePicker}
//                 onRequestClose={() => setShowTimePicker(false)}
//               >
//                 <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.9)] ">
//                   <View className="bg-white p-4 rounded-lg w-4/5">
//                     <DateTimePicker
//                       testID="iosTimePicker"
//                       value={reminderTime}
//                       mode="time"
//                       is24Hour={false}
//                       display="spinner"
//                       onChange={onTimeChange}
//                     />
//                     <TouchableOpacity
//                       onPress={() => setShowTimePicker(false)}
//                       className="mt-4 bg-blue-500 p-2 rounded-full"
//                     >
//                       <Text className="text-white text-center">Done</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </Modal>
//             )}

//             {/* Android Time Picker (no modal needed) */}
//             {Platform.OS === "android" && showTimePicker && (
//               <DateTimePicker
//                 testID="androidTimePicker"
//                 value={reminderTime}
//                 mode="time"
//                 is24Hour={false}
//                 display="default"
//                 onChange={onTimeChange}
//               />
//             )}
//           </View>

//           {/* End Date */}
//           <Text className="text-xl font-bold text-white mb-2">End At</Text>
//           <View className="flex-row space-x-2 mb-4">
//             <TouchableOpacity
//               onPress={() => setEndDate(null)}
//               className={`px-4 py-2 rounded-lg ${
//                 endDate === null ? "bg-blue-500" : "bg-gray-700"
//               }`}
//             >
//               <Text className="text-white">Never</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => setShowEndDatePicker(true)}
//               className={`px-4 py-2 rounded-lg ${
//                 endDate !== null ? "bg-blue-500" : "bg-gray-700"
//               }`}
//             >
//               <Text className="text-white">
//                 {endDate ? format(endDate, "MMM dd, yyyy") : "Select Date"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {showEndDatePicker && (
//             <DateTimePicker
//               testID="endDatePicker"
//               value={endDate || addYears(new Date(), 1)}
//               mode="date"
//               is24Hour={true}
//               display="default"
//               onChange={onEndDateChange}
//               minimumDate={new Date()}
//             />
//           )}
//         </ScrollView>
//       </Container>
//       <BottomTab>
//         <TouchableOpacity
//           className="bg-blue-500 w-[90%] mx-auto rounded-lg py-3  text-center"
//           onPress={handleSave}
//         >
//           <Text className="text-white text-lg text-center">Save Changes</Text>
//         </TouchableOpacity>
//       </BottomTab>
//     </View>
//   );
// };

// export default EditHabit;
