import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import useHabitStore from '@/store/useHabitStore'; 

const Habits = () => {
  const { habits, loadHabits } = useHabitStore(); 

  
  useEffect(() => {
    const fetchHabits = async () => {
      await loadHabits(); 
    };
    fetchHabits();
  }, [loadHabits]);

  return (
    <View>
      <Text>Habits</Text>
      {habits.length > 0 ? (
        habits.map((habit) => (
          <TouchableOpacity
            className="bg-gray-800 rounded-full p-2 mb-4 flex flex-row justify-between items-center"
            key={habit.id}
          >
            <Text className="text-gray-300">{habit.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-gray-300">No habits created yet.</Text>
      )}
    </View>
  );
};

export default Habits;