import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";

interface RepeatConfig {
  type: "daily" | "weekly" | "monthly";
  weekDays?: number[];
  monthDay?: number;
}

interface RepeatModalProps {
  visible: boolean;
  onClose: () => void;
  repeatConfig: RepeatConfig;
  setRepeatConfig: (config: RepeatConfig) => void;
}

const RepeatModal = ({ visible, onClose, repeatConfig, setRepeatConfig }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.7)]">
        <View className="bg-gray-700 p-4 rounded-lg w-4/5">
          <Text className="text-white text-xl font-bold mb-4">Repeat</Text>
          <TouchableOpacity
            onPress={() => {
              setRepeatConfig({ type: "daily" });
              onClose();
            }}
            className="bg-blue-500 p-2 rounded-lg mb-2"
          >
            <Text className="text-white text-center">Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRepeatConfig({
                type: "weekly",
                weekDays: [0, 1, 2, 3, 4, 5, 6],
              });
              onClose();
            }}
            className="bg-blue-500 p-2 rounded-lg mb-2"
          >
            <Text className="text-white text-center">Weekly</Text>
          </TouchableOpacity>
          {repeatConfig.type === "weekly" && (
            <View className="flex-row flex-wrap justify-between mb-2">
              {weekDays.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => {
                    const newWeekDays = repeatConfig.weekDays?.includes(index)
                      ? repeatConfig.weekDays.filter((d) => d !== index)
                      : [...(repeatConfig.weekDays || []), index];
                    setRepeatConfig({ ...repeatConfig, weekDays: newWeekDays });
                  }}
                  className={`bg-gray-600 p-2 rounded-lg m-1 ${
                    repeatConfig.weekDays?.includes(index) ? "bg-blue-500" : ""
                  }`}
                >
                  <Text className="text-white">{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setRepeatConfig({ type: "monthly", monthDay: 1 });
              onClose();
            }}
            className="bg-blue-500 p-2 rounded-lg mb-2"
          >
            <Text className="text-white text-center">Monthly</Text>
          </TouchableOpacity>
          {repeatConfig.type === "monthly" && (
            <TextInput
              placeholder="Day of month (1-31)"
              placeholderTextColor="#4B5563"
              value={repeatConfig.monthDay?.toString() || ""}
              onChangeText={(text) => {
                const day = parseInt(text);
                if (day >= 1 && day <= 31) {
                  setRepeatConfig({ ...repeatConfig, monthDay: day });
                }
              }}
              keyboardType="numeric"
              className="bg-gray-800 text-white p-2 rounded-lg text-base border border-gray-700 mb-2"
            />
          )}
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RepeatModal;
