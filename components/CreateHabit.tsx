import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BottomSheet from './BottomSheet'
import { BottomSheetProps } from '@/@types/bottomSheet'
import InputField from './InputField'
import { Feather, AntDesign } from '@expo/vector-icons'
import BottomTab from './BottomTab'

const CreateHabit = ({ isVisible, onClose }: BottomSheetProps) => {
  const [habitName, setHabitName] = useState("");

  return (
    <BottomSheet onClose={onClose} isVisible={isVisible} height="100%">
      <View className="w-[90%] mx-auto flex-1 pb-20">
        <View className="flex flex-row items-center justify-between mb-4 pt-10">
          <Text className="text-white text-lg">Create Habit</Text>
          <TouchableOpacity>
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <InputField
            label="Habit Name"
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
          />
        </ScrollView>
      </View>
      <BottomTab>
        <TouchableOpacity className='bg-blue-500 w-[90%]  rounded-md p-4' >
          <Text className='text-white font-bold text-base text-center'>Save</Text>
        </TouchableOpacity>
      </BottomTab>
    </BottomSheet>
  );
}

export default CreateHabit