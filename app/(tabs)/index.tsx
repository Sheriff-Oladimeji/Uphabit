import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import InteractiveCalendar from "@/components/InteractiveCalender";

export default function Home() {
  return (
    <Container>
      <InteractiveCalendar />
    </Container>
  );
}
