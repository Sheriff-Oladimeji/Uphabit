import React from "react";
import { View, Text, TextInput } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) => (
  <View className="mb-6">
    <Text className="text-gray-300 font-semibold text-lg mb-2">{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#4B5563"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      className="bg-gray-800 text-white p-4 rounded-lg text-base border border-gray-700"
    />
  </View>
);

export default InputField;
