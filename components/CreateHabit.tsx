import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

type CreateHabitModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onCreateHabit: (type: "break" | "build") => void;
};

export function CreateHabitModal({
  isVisible,
  onClose,
  onCreateHabit,
}: CreateHabitModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      >
           <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      <View className="bg-darkBg z-50 p-5 absolute bottom-24 w-[90%] left-[10%] rounded-xl">
        <View className="bg-white p-6 rounded-lg w-4/5">
          <Text className="text-xl font-bold mb-4 text-center">
            Create a Habit
          </Text>
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg mb-3"
            onPress={() => onCreateHabit("break")}
          >
            <Text className="text-white text-center font-semibold">
              Break a Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 p-3 rounded-lg"
            onPress={() => onCreateHabit("build")}
          >
            <Text className="text-white text-center font-semibold">
              Build a Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4" onPress={onClose}>
            <Text className="text-blue-500 text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
              </View>
              </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(29, 29, 29, 0.2)",
    justifyContent: "flex-end",
    zIndex: 1,
    height: "100%",
  },
});