import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import useHabitStore from '@/store/useHabitStore'; // Import the habit store

const Habits = () => {
  const { habits, loadHabits } = useHabitStore(); // Get habits and loadHabits from the store

  // Fetch habits when the component mounts
  useEffect(() => {
    const fetchHabits = async () => {
      await loadHabits(); // Load habits from AsyncStorage
    };
    fetchHabits();
  }, [loadHabits]);

  return (
    <View>
      <Text>Habits</Text>
      {habits.length > 0 ? (
        habits.map((habit) => (
          <Text key={habit.id} className="text-gray-300">
            {habit.name}
          </Text>
        ))
      ) : (
        <Text className="text-gray-300">No habits created yet.</Text>
      )}
    </View>
  );
};

export default Habits;