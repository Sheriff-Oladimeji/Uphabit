import React, { useMemo } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Calendar } from "react-native-calendars";
import { FontAwesome } from "@expo/vector-icons";
import useHabitStore from "@/store/useJunkStore";

const StatCard: React.FC<{
  iconName: string;
  title: string;
  value: string;
}> = ({ iconName, title, value }) => (
  <View className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center">
    <FontAwesome name={iconName as any} size={24} color="#60A5FA" />
    <View className="ml-4">
      <Text className="text-gray-400 text-sm">{title}</Text>
      <Text className="text-white text-2xl font-bold">{value}</Text>
    </View>
  </View>
);

const Statistics = () => {
  const { habits } = useHabitStore();

  const totalAwesomeDays = useMemo(() => {
    return Object.values(
      habits.reduce((acc: { [key: string]: number }, habit) => {
        // Define the type of acc
        Object.keys(habit.completionDates).forEach((date) => {
          if (habit.completionDates[date]) {
            acc[date] = (acc[date] || 0) + 1;
          }
        });
        return acc;
      }, {})
    ).filter((count) => count === habits.length).length;
  }, [habits]);

  const currentStreak = () => {
    // Implement your logic for current streak
    return 0; // Replace with actual calculation
  };

  const bestStreak = () => {
    // Implement your logic for best streak
    return 1; // Replace with actual calculation
  };

  const totalTimesDone = useMemo(() => {
    return habits.reduce((total, habit) => {
      return (
        total + Object.values(habit.completionDates).filter(Boolean).length
      );
    }, 0);
  }, [habits]);

  const chartData = useMemo(() => {
    const data = [];
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      labels.push(dateString.slice(-5)); // Only show MM-DD
      const completedCount = habits.filter(
        (habit) => habit.completionDates[dateString]
      ).length;
      data.push(completedCount);
    }
    return { labels, data };
  }, [habits]);

  return (
    <ScrollView
      className="flex-1 bg-gray-900  py-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text className="text-white text-2xl font-bold mb-6">Statistics</Text>

      <StatCard
        iconName="calendar"
        title="Total awesome days"
        value={`${totalAwesomeDays} days`}
      />
      <StatCard
        iconName="line-chart"
        title="Your current streak"
        value={`${currentStreak()} days`}
      />
      <StatCard
        iconName="trophy"
        title="Best streak"
        value={`${bestStreak()} days`}
      />
      <StatCard
        iconName="check-circle"
        title="Total times done"
        value={`${totalTimesDone} times`}
      />

      <View className="bg-gray-800 rounded-lg p-4 mb-6">
        <Text className="text-gray-400 text-sm mb-4">
          Habit Completion Over Last 7 Days
        </Text>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }],
          }}
          width={Dimensions.get("window").width - 60}
          height={220}
          chartConfig={{
            backgroundColor: "#1F2937",
            backgroundGradientFrom: "#1F2937",
            backgroundGradientTo: "#1F2937",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
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

      <View className="bg-gray-800 rounded-lg p-4 mb-6">
        <Text className="text-gray-400 text-sm mb-4">Calendar</Text>
        <Calendar
          style={{ borderRadius: 10 }}
          theme={{
            backgroundColor: "#1F2937",
            calendarBackground: "#1F2937",
            textSectionTitleColor: "#9CA3AF",
            selectedDayBackgroundColor: "#60A5FA",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#60A5FA",
            dayTextColor: "#D1D5DB",
            textDisabledColor: "#4B5563",
            dotColor: "#60A5FA",
            selectedDotColor: "#ffffff",
            arrowColor: "#60A5FA",
            monthTextColor: "#D1D5DB",
            indicatorColor: "#60A5FA",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          markingType={"multi-dot"}
          markedDates={{
            ...habits.reduce(
              (
                acc: Record<string, { dots: { key: string; color: string }[] }>,
                habit
              ) => {
                Object.keys(habit.completionDates).forEach((date) => {
                  if (habit.completionDates[date]) {
                    if (!acc[date]) {
                      acc[date] = { dots: [] };
                    }
                    acc[date].dots.push({ key: habit.id, color: "#60A5FA" });
                  }
                });
                return acc;
              },
              {} as Record<string, { dots: { key: string; color: string }[] }>
            ), // Remove the comma and fix the syntax
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Statistics;
