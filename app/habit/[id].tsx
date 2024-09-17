import React, { useMemo } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "@/components/Container";
import useHabitStore from "@/store/useHabitStore";
import { format, eachDayOfInterval, subDays, isWithinInterval } from "date-fns";
import { LineChart } from "react-native-chart-kit";
import { Feather } from "@expo/vector-icons";

const HabitDetails = () => {
  const { id } = useLocalSearchParams();
  const { habits } = useHabitStore();
  const habit = habits.find((h) => h.id === id);

  if (!habit) {
    return (
      <Container>
        <Text className="text-white text-lg">Habit not found</Text>
      </Container>
    );
  }

  const completionRate =
    (Object.values(habit.completionDates).filter(Boolean).length /
      Object.keys(habit.completionDates).length) *
    100;

  const calculateStreak = () => {
    const sortedDates = Object.entries(habit.completionDates)
      .filter(([_, completed]) => completed)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i][0]);
      const previousDate = i > 0 ? new Date(sortedDates[i - 1][0]) : new Date();

      if (previousDate.getTime() - currentDate.getTime() === 86400000) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const chartData = useMemo(() => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return last7Days.map((date) => {
      const dateString = format(date, "yyyy-MM-dd");
      return habit.completionDates[dateString] ? 1 : 0;
    });
  }, [habit.completionDates]);

  return (
    <Container>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-bold mb-6 mt-4">
          {habit.name}
        </Text>

        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">
            Habit Details
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-8">
                <Feather name="info" size={18} color="#9CA3AF" />
              </View>
              <Text className="text-gray-300 flex-1">
                Type:{" "}
                <Text className="text-white font-medium">{habit.type}</Text>
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8">
                <Feather name="repeat" size={18} color="#9CA3AF" />
              </View>
              <Text className="text-gray-300 flex-1">
                Habit Type:{" "}
                <Text className="text-white font-medium">
                  {habit.habitType}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8">
                <Feather name="calendar" size={18} color="#9CA3AF" />
              </View>
              <Text className="text-gray-300 flex-1">
                Start Date:{" "}
                <Text className="text-white font-medium">
                  {format(new Date(habit.startDate), "PPP")}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8">
                <Feather name="refresh-cw" size={18} color="#9CA3AF" />
              </View>
              <Text className="text-gray-300 flex-1">
                Repeat:{" "}
                <Text className="text-white font-medium">
                  {habit.repeatFrequency}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8">
                <Feather name="clock" size={18} color="#9CA3AF" />
              </View>
              <Text className="text-gray-300 flex-1">
                Time of Day:{" "}
                <Text className="text-white font-medium">
                  {habit.timeOfDay}
                </Text>
              </Text>
            </View>
            {habit.target && (
              <View className="flex-row items-center">
                <View className="w-8">
                  <Feather name="target" size={18} color="#9CA3AF" />
                </View>
                <Text className="text-gray-300 flex-1">
                  Target:{" "}
                  <Text className="text-white font-medium">
                    {habit.target} {habit.unit}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">
            Analytics
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-gray-300 mb-1">Completion Rate</Text>
              <Text className="text-white text-2xl font-bold">
                {completionRate.toFixed(0)}%
              </Text>
              <View className="w-16 h-16 rounded-full border-4 border-blue-500 justify-center items-center mt-2">
                <Text className="text-white text-lg font-bold">
                  {completionRate.toFixed(0)}%
                </Text>
              </View>
            </View>
            <View className="items-center">
              <Text className="text-gray-300 mb-1">Total Completions</Text>
              <Text className="text-white text-2xl font-bold">
                {Object.values(habit.completionDates).filter(Boolean).length}
              </Text>
              <View className="w-16 h-16 rounded-full bg-green-500 justify-center items-center mt-2">
                <Feather name="check" size={32} color="white" />
              </View>
            </View>
            <View className="items-center">
              <Text className="text-gray-300 mb-1">Current Streak</Text>
              <Text className="text-white text-2xl font-bold">
                {calculateStreak()}
              </Text>
              <View className="w-16 h-16 rounded-full bg-orange-500 justify-center items-center mt-2">
                <Feather name="zap" size={32} color="white" />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">
            Last 7 Days Performance
          </Text>
          <LineChart
            data={{
              labels: ["", "", "", "", "", "", ""],
              datasets: [{ data: chartData }],
            }}
            width={Dimensions.get("window").width - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#1F2937",
              backgroundGradientFrom: "#1F2937",
              backgroundGradientTo: "#1F2937",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#60A5FA",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default HabitDetails;
