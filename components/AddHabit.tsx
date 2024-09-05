import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useHabitStore from '../store/useHabitStore';
import useDateStore from '@/store/useDateStore';
import { format } from 'date-fns';

interface AddHabitFormProps {
  type: 'build' | 'quit';
  onClose: () => void;
}

export function AddHabitForm({ type, onClose }: AddHabitFormProps) {
  const { currentDate } = useDateStore();
  const [habitName, setHabitName] = useState('');
  const [startDate, setStartDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = async () => {
    if (habitName.trim()) {
      await addHabit({ name: habitName.trim(), type, startDate: startDate.toISOString() });
      onClose();
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  return (
    <View className="p-5">
      <Text className="text-xl font-bold text-white mb-4">
        {type === 'build' ? 'Build a new habit' : 'Quit a habit'}
      </Text>
      <TextInput
        className="bg-gray-700 text-white p-3 rounded-lg mb-4"
        placeholder="Enter habit name"
        placeholderTextColor="#9ca3af"
        value={habitName}
        onChangeText={setHabitName}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="bg-gray-700 p-3 rounded-lg mb-4"
      >
        <Text className="text-white">Start habit on: {format(startDate, 'MMM dd, yyyy')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
}
