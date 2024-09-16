import React, { useMemo } from "react";
import { View, Text, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { LineChart } from "react-native-chart-kit";
import useHabitStore from "@/store/useHabitStore";

const Statistics = () => {
  const { habits } = useHabitStore();

  // Calculate total awesome days (days when all habits are completed)
  const totalAwesomeDays = () => {
    return Object.values(
      habits.reduce((acc: { [key: string]: number }, habit) => { // Added 'habit' as a parameter
        Object.keys(habit.completionDates).forEach((date) => {
          if (habit.completionDates[date]) {
            acc[date] = (acc[date] || 0) + 1;
          }
        });
        return acc;
      }, {})
    ).filter((count) => count === habits.length).length;
  };

  // Calculate current streak
  const currentStreak = () => {
    // Implement your logic for current streak
    return 0; // Replace with actual calculation
  };

  // Calculate best streak
  const bestStreak = () => {
    // Implement your logic for best streak
    return 1; // Replace with actual calculation
  };

  // Calculate total times done
  const totalTimesDone = () => {
    return habits.reduce((total, habit) => {
      return (
        total + Object.values(habit.completionDates).filter(Boolean).length
      );
    }, 0);
  };

  // Prepare data for the chart
  const chartData = useMemo(() => {
    const data = [];
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      labels.push(dateString);
      const completedCount = habits.filter(habit => habit.completionDates[dateString]).length;
      data.push(completedCount);
    }
    return { labels: labels.reverse(), data: data.reverse() };
  }, [habits]);

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-2xl font-bold mb-4">Statistics</Text>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-gray-300">Total awesome days</Text>
        <Text className="text-white text-3xl font-bold">
          {totalAwesomeDays()} days
        </Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-gray-300">Your current streak</Text>
        <Text className="text-white text-3xl font-bold">
          {currentStreak()} days
        </Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-gray-300">Best streak</Text>
        <Text className="text-white text-3xl font-bold">
          {bestStreak()} days
        </Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-gray-300">Total times done</Text>
        <Text className="text-white text-3xl font-bold">
          {totalTimesDone()} times
        </Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-gray-300 mb-2">Habit Completion Over Last 7 Days</Text>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }]
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#1F2937",
            backgroundGradientFrom: "#1F2937",
            backgroundGradientTo: "#1F2937",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View className="bg-gray-800 rounded-lg mb-4">
        <Text className="text-gray-300 mb-2">Calendar</Text>
        <Calendar
          // You can customize the calendar here
          style={{ borderRadius: 10 }}
          theme={{
            backgroundColor: '#1F2937',
            calendarBackground: '#1F2937',
            textSectionTitleColor: '#ffffff',
            selectedDayBackgroundColor: '#4F46E5',
            todayTextColor: '#ffffff',
            dayTextColor: '#ffffff',
            textDisabledColor: '#555555',
            arrowColor: '#ffffff',
            monthTextColor: '#ffffff',
            indicatorColor: '#ffffff',
          }}
          markingType={'multi-dot'}
          markedDates={{
            // Mark dates based on completion
            ...habits.reduce((acc, habit) => {
              Object.keys(habit.completionDates).forEach(date => {
                if (habit.completionDates[date]) {
                  acc[date] = { dots: [{ key: habit.id, color: '#4F46E5' }] }; // Ensure 'acc' is typed correctly
                }
              });
              return acc;
            }, {} as { [key: string]: { dots: { key: string; color: string }[] } }) // Added type assertion
          }}
        />
      </View>
    </View>
  );
};

export default Statistics;
