import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "@/components/Container";

// Pomodoro Timer Component
const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Initial time: 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Initialize interval to null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (interval) clearInterval(interval); // Check if interval is not null
      setIsActive(false);
      alert(
        isBreak
          ? "Break time's over! Get back to work."
          : "Pomodoro done! Time for a break."
      );
      setIsBreak(!isBreak); // Switch between work and break mode
      if (isBreak) {
        setTimeLeft(25 * 60); // 25 minutes for work
      } else {
        setTimeLeft(5 * 60); // 5 minutes for break
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    }
  }, [isActive, timeLeft, isBreak]);

  // Start/Pause toggle function
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer function
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60); // Reset based on current mode
  };

  return (
    <View className="items-center bg-gray-800 p-6 rounded-3xl shadow-lg">
      <Text className="text-5xl font-bold text-blue-400">
        {formatTime(timeLeft)}
      </Text>
      <TouchableOpacity
        onPress={toggleTimer}
        className="mt-6 px-10 py-3 bg-blue-500 rounded-full"
      >
        <Text className="text-white text-lg font-semibold">
          {isActive ? "Pause" : "Start"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={resetTimer}
        className="mt-4 px-10 py-3 bg-red-500 rounded-full"
      >
        <Text className="text-white text-lg font-semibold">Reset</Text>
      </TouchableOpacity>
      <Text className="mt-4 text-gray-300 text-sm italic">
        {isBreak ? "Break Time" : "Focus Time"}
      </Text>
    </View>
  );
};

const focus = () => {
  return (
    <Container>
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-white mb-6">
          Pomodoro Timer
        </Text>
        <PomodoroTimer />
      </View>
    </Container>
  );
};

export default focus;
