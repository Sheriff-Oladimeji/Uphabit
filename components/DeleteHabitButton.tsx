import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import useHabitStore from "../store/useJunkStore";

interface DeleteHabitButtonProps {
  habitId: string;
}

const DeleteHabitButton: React.FC<DeleteHabitButtonProps> = ({ habitId }) => {
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const handleDelete = () => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteHabit(habitId);
          } catch (error) {
            console.error("Error deleting habit:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleDelete} className="p-2">
      <Feather name="trash-2" size={20} color="#EF4444" />
    </TouchableOpacity>
  );
};

export default DeleteHabitButton;
