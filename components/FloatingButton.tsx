import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';

const FloatingButton = () => {
  return (
    <TouchableOpacity className="w-14 h-14 bg-blue-500 absolute bottom-6 right-4 rounded-full flex flex-col items-center justify-center">
      <Feather name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default FloatingButton