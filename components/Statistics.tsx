import React, { useMemo } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import useHabitStore from "@/store/useHabitStore";

const Statistics = () => {
  const { habits } = useHabitStore();

  const totalAwesomeDays = () => {
    return Object.values(
      habits.reduce((acc: { [key: string]: number }, habit) => {
        Object.keys(habit.completionDates).forEach((date) => {
          if (habit.completionDates[date]) {
            acc[date] = (acc[date] || 0) + 1;
          }
        });
        return acc;
      }, {})
    ).filter((count) => count === habits.length).length;
  };

  const currentStreak = () => {
    return 0;
  };

  const bestStreak = () => {
    return 1;
  };

  const totalTimesDone = () => {
    return habits.reduce((total, habit) => {
      return (
        total + Object.values(habit.completionDates).filter(Boolean).length
      );
    }, 0);
  };

  const chartData = useMemo(() => {
    const data = [];
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      labels.push(dateString);
      const completedCount = habits.filter(
        (habit) => habit.completionDates[dateString]
      ).length;
      data.push(completedCount);
    }
    return { labels: labels.reverse(), data: data.reverse() };
  }, [habits]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>

      {/* Total Awesome Days */}
      <View style={styles.statBox}>
        <View>
          <Text style={styles.statLabel}>Total Awesome Days</Text>
          <Text style={styles.statValue}>{totalAwesomeDays()} days</Text>
        </View>
        <FontAwesome5 name="calendar-check" size={40} color="#FEE715FF" />
      </View>

      {/* Current Streak */}
      <View style={styles.statBox}>
        <View>
          <Text style={styles.statLabel}>Current Streak</Text>
          <Text style={[styles.statValue, styles.currentStreak]}>
            {currentStreak()} days
          </Text>
        </View>
        <FontAwesome5 name="fire" size={40} color="#00ADB5" />
      </View>

      {/* Best Streak */}
      <View style={styles.statBox}>
        <View>
          <Text style={styles.statLabel}>Best Streak</Text>
          <Text style={[styles.statValue, styles.bestStreak]}>
            {bestStreak()} days
          </Text>
        </View>
        <MaterialIcons name="stars" size={40} color="#FF5722" />
      </View>

      {/* Total Times Done */}
      <View style={styles.statBox}>
        <View>
          <Text style={styles.statLabel}>Total Times Done</Text>
          <Text style={[styles.statValue, styles.totalTimesDone]}>
            {totalTimesDone()} times
          </Text>
        </View>
        <Ionicons name="checkmark-done-circle" size={40} color="#9C27B0" />
      </View>

      {/* Line Chart for Weekly Progress */}
      <View style={styles.chartBox}>
        <Text style={styles.chartLabel}>Habit Completion Over Last 7 Days</Text>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }],
          }}
          width={Dimensions.get("window").width - 50}
          height={240}
          chartConfig={{
            backgroundColor: "#303841",
            backgroundGradientFrom: "#303841",
            backgroundGradientTo: "#303841",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(254, 231, 21, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#FEE715FF",
            },
          }}
          bezier
          style={styles.chartStyle}
        />
      </View>

      {/* Calendar */}
      <View style={styles.calendarBox}>
        <Text style={styles.chartLabel}>Calendar</Text>
        <Calendar
          style={styles.calendarStyle}
          theme={{
            backgroundColor: "#303841",
            calendarBackground: "#303841",
            textSectionTitleColor: "#FEE715FF",
            selectedDayBackgroundColor: "#00ADB5",
            todayTextColor: "#FF5722",
            dayTextColor: "#EEEEEE",
            textDisabledColor: "#555555",
            arrowColor: "#FEE715FF",
            monthTextColor: "#FEE715FF",
            indicatorColor: "#FEE715FF",
          }}
          markingType="multi-dot"
          markedDates={{
            ...habits.reduce((acc, habit) => {
              Object.keys(habit.completionDates).forEach((date) => {
                if (habit.completionDates[date]) {
                  acc[date] = { dots: [{ key: habit.id, color: "#00ADB5" }] };
                }
              });
              return acc;
            }, {}),
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820FF",
    padding: 16,
  },
  title: {
    color: "#FEE715FF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: "#303841",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  statLabel: {
    color: "#EEEEEE",
    fontSize: 16,
  },
  statValue: {
    color: "#FEE715FF",
    fontSize: 32,
    fontWeight: "bold",
  },
  currentStreak: {
    color: "#00ADB5",
  },
  bestStreak: {
    color: "#FF5722",
  },
  totalTimesDone: {
    color: "#9C27B0",
  },
  chartBox: {
    backgroundColor: "#303841",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  chartLabel: {
    color: "#EEEEEE",
    fontSize: 16,
    marginBottom: 12,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  calendarBox: {
    backgroundColor: "#303841",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  calendarStyle: {
    borderRadius: 10,
  },
});

export default Statistics;
