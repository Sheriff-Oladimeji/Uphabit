import React, { useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import useCreateStore from "../store/useCreateStore";
import HabitTracker from "./HabitTracker";

const Habits = () => {
  const { habits, loadHabits, toggleHabitCompletion, getHabitProgress } =
    useCreateStore();

  useEffect(() => {
    loadHabits();
    // Add a test habit if none exist
    if (habits.length === 0) {
      useCreateStore.getState().addHabit({
        id: Date.now().toString(),
        name: "Test Habit",
        motivation: "Test motivation",
        reminderTime: new Date(),
        category: "sport",
        streakGoal: null,
        currentStreak: 0,
        startDate: new Date(),
        progress: [],
      });
    }
  }, []);

  console.log("Current habits:", habits); // Debug log

  const handleToggle = (habitId: string, date: string) => {
    toggleHabitCompletion(habitId, date);
  };

  return (
    
      <ScrollView className="pb-12 flex-1" showsVerticalScrollIndicator={false}>
        <View className="pt-4">
          {habits.length === 0 ? (
            <Text className="text-white text-center py-4">
              No habits yet. Try adding one!
            </Text>
          ) : (
            habits.map((habit) => (
              <HabitTracker
                key={habit.id}
                id={habit.id}
                name={habit.name}
                category={habit.category}
                progress={getHabitProgress(habit.id)}
                onToggle={(date) => handleToggle(habit.id, date)}
              />
            ))
          )}
        </View>
      </ScrollView>
   
  );
};

export default Habits;
