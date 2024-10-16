import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
interface ButtonProps {
  onPress: () => void;
}

const FloatingButton = ({ onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="w-14 h-14 bg-blue-500 absolute bottom-6 right-4 rounded-full flex flex-col items-center justify-center"
      onPress={onPress}
    >
      <Feather name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
