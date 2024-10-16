import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const HabitHeader = () => {


 const router = useRouter()
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View className="flex flex-row items-center justify-between mt-2">
      <View className="flex flex-row gap-4 items-center">
        <TouchableOpacity
          className="rounded-full border-2 border-white"
          onPress={() => router.push("/(tabs)/profile")}
        >
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
          <Text className="text-gray-400">{getGreeting()}</Text>
        </View>
      </View>
      <TouchableOpacity>
        
        <MaterialCommunityIcons name="crown" size={30} color="gold" />
      </TouchableOpacity>
    </View>
  );
}

export default HabitHeader