import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import InteractiveCalendar from "@/components/InteractiveCalender";
import HabitHeader from "@/components/HabitHeader";

export default function Home() {
  return (
    <Container>
      <HabitHeader/>
      <InteractiveCalendar />
    </Container>
  );
}
