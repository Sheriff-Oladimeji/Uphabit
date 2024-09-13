import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet from "./BottomSheet";

interface HabitOptionsProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  name: string;
}

const HabitOptions = ({ isVisible, onClose, onDelete, onEdit, name }: HabitOptionsProps) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose} radius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Habit</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default HabitOptions;
