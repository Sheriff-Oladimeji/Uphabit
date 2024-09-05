import { View, Text } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Summary = () => {
  const progress = 52; 

  return (
    <View className="bg-gray-700 p-4 rounded-lg mt-6 flex flex-row justify-between">
      <View>
        <Text className="text-white text-lg font-medium mb-5">
          You're almost done!
        </Text>
        <View className="flex-row justify-between items-center  gap-6">
          <View>
            <Text className="text-white text-xl">2/3</Text>
            <Text className="text-sm text-white">Habits</Text>
          </View>
          <View>
            <Text className="text-white text-xl">3/5</Text>
            <Text className="text-sm text-white">Tasks</Text>
          </View>
        </View>
      </View>
      <View className="">
        {/* Circular Progress Chart */}
        <AnimatedCircularProgress
          size={80}
          width={10}
          fill={progress} 
          tintColor="#4ade80" 
          backgroundColor="white" 
          rotation={0} 
          lineCap="round" 
        >
          {() => <Text className="text-white text-xl">{progress}%</Text>}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

export default Summary;
