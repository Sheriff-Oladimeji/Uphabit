import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface GridProps {
  totalDays: number;
  completedDays: number;
  onToggleDay?: (day: number) => void;
}

const StreakGrid: React.FC<GridProps> = ({
  totalDays,
  completedDays,
  onToggleDay,
}) => {
  const rows = Math.ceil(totalDays / 7);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="activity" size={24} color="#fff" />
        <Text style={styles.headerText}>Streak</Text>
        <View style={styles.checkContainer}>
          <Feather name="check" size={18} color="#000" />
        </View>
      </View>
      <View style={styles.grid}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[...Array(7)].map((_, colIndex) => {
              const day = rowIndex * 7 + colIndex + 1;
              if (day <= totalDays) {
                const isCompleted = day <= completedDays;
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.day, isCompleted && styles.completedDay]}
                    // onPress={() => onToggleDay(day)}
                  >
                    {isCompleted && (
                      <Feather name="check" size={14} color="#1c1c1e" />
                    )}
                  </TouchableOpacity>
                );
              }
              return <View key={colIndex} style={styles.emptyDay} />;
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  checkContainer: {
    backgroundColor: "#e6c9ba",
    borderRadius: 12,
    padding: 6,
  },
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  day: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  completedDay: {
    backgroundColor: "#e6c9ba",
  },
  emptyDay: {
    width: 24,
    height: 24,
  },
});

export default StreakGrid;
