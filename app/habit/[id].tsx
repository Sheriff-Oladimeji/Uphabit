import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Container from '@/components/Container';
import useHabitStore from '@/store/useHabitStore';
import { format } from 'date-fns';

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

  return (
    <Container>
      <ScrollView className="flex-1">
        <Text className="text-white text-2xl font-bold mb-4">{habit.name}</Text>
        
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-lg mb-2">Habit Details</Text>
          <Text className="text-gray-300">Type: {habit.type}</Text>
          <Text className="text-gray-300">Habit Type: {habit.habitType}</Text>
          <Text className="text-gray-300">Start Date: {format(new Date(habit.startDate), 'PPP')}</Text>
          <Text className="text-gray-300">Repeat: {habit.repeatFrequency}</Text>
          <Text className="text-gray-300">Time of Day: {habit.timeOfDay}</Text>
          {habit.target && <Text className="text-gray-300">Target: {habit.target} {habit.unit}</Text>}
        </View>

        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-lg mb-2">Analytics</Text>
          <Text className="text-gray-300">Completion Rate: {completionRate.toFixed(2)}%</Text>
          <Text className="text-gray-300">Total Completions: {Object.values(habit.completionDates).filter(Boolean).length}</Text>
          <Text className="text-gray-300">Streak: {/* TODO: Implement streak calculation */}</Text>
        </View>

        {/* TODO: Add more analytics and visualizations here */}
      </ScrollView>
    </Container>
  );
};

export default HabitDetails;
