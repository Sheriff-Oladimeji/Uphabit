import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "@/components/Container";
import InteractiveCalendar from "@/components/InteractiveCalender";
import HabitHeader from "@/components/HabitHeader";
import Summary from "@/components/Summary";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <HabitHeader />
      <Summary />
      <InteractiveCalendar />
    </Container>
  );
}
