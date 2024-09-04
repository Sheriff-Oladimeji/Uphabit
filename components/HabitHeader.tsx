import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const HabitHeader = () => {
  return (
    <View className="flex flex-row items-center justify-between mt-6 w-[90%] mx-auto t">
      <View className="flex flex-row gap-4 items-center">
        <TouchableOpacity className='rounded-full border-2 border-white'>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWRzaG90fGVufDB8fDB8fHww",
            }}
            className="w-10 h-10 rounded-full"
            alt="image.png"
          />
        </TouchableOpacity>
        <View className="">
          <Text className="text-white font-bold text-xl">Hello Sheriff</Text>
          <Text className="text-gray-400">Good morning</Text>
        </View>
      </View>
      <TouchableOpacity>
        <FontAwesome name="bell" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default HabitHeader