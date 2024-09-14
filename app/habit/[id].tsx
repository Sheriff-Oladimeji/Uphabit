import React, { useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Container from '@/components/Container';
import useHabitStore from '@/store/useHabitStore';
import { format, eachDayOfInterval, subDays, isWithinInterval } from 'date-fns';
import { LineChart } from 'react-native-chart-kit';

const HabitDetails = () => {
  const { id } = useLocalSearchParams();
  const { habits } = useHabitStore();
  const habit = habits.find(h => h.id === id);

  if (!habit) {
    return (
      <Container>
        <Text className="text-white text-lg">Habit not found</Text>
      </Container>
    );
  }

  const completionRate = Object.values(habit.completionDates).filter(Boolean).length / Object.keys(habit.completionDates).length * 100;

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
      end: new Date()
    });

    return last7Days.map(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      return habit.completionDates[dateString] ? 1 : 0;
    });
  }, [habit.completionDates]);

  return (
    <Container>
      <ScrollView className="flex-1 px-4">
        <Text className="text-white text-3xl font-bold mb-6 mt-4">{habit.name}</Text>
        
        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">Habit Details</Text>
          <View className="space-y-2">
            <Text className="text-gray-300">Type: <Text className="text-white font-medium">{habit.type}</Text></Text>
            <Text className="text-gray-300">Habit Type: <Text className="text-white font-medium">{habit.habitType}</Text></Text>
            <Text className="text-gray-300">Start Date: <Text className="text-white font-medium">{format(new Date(habit.startDate), 'PPP')}</Text></Text>
            <Text className="text-gray-300">Repeat: <Text className="text-white font-medium">{habit.repeatFrequency}</Text></Text>
            <Text className="text-gray-300">Time of Day: <Text className="text-white font-medium">{habit.timeOfDay}</Text></Text>
            {habit.target && <Text className="text-gray-300">Target: <Text className="text-white font-medium">{habit.target} {habit.unit}</Text></Text>}
          </View>
        </View>

        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">Analytics</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-300 mb-1">Completion Rate</Text>
              <Text className="text-white text-2xl font-bold">{completionRate.toFixed(2)}%</Text>
            </View>
            <View>
              <Text className="text-gray-300 mb-1">Total Completions</Text>
              <Text className="text-white text-2xl font-bold">{Object.values(habit.completionDates).filter(Boolean).length}</Text>
            </View>
            <View>
              <Text className="text-gray-300 mb-1">Current Streak</Text>
              <Text className="text-white text-2xl font-bold">{calculateStreak()} days</Text>
            </View>
          </View>
        </View>

        <View className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
          <Text className="text-white text-xl font-semibold mb-4">Last 7 Days Performance</Text>
          <LineChart
            data={{
              labels: ['', '', '', '', '', '', ''],
              datasets: [{ data: chartData }]
            }}
            width={Dimensions.get('window').width - 60}
            height={220}
            chartConfig={{
              backgroundColor: '#1F2937',
              backgroundGradientFrom: '#1F2937',
              backgroundGradientTo: '#1F2937',
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
      </ScrollView>
    </Container>
  );
};

export default HabitDetails;
