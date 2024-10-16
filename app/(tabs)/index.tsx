import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "@/components/Container";
import { Alert, Text, View } from "react-native";
import FloatingButton from "@/components/FloatingButton";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <View>
        <Text className="text-white text-3xl font-bold  text-center">
          Hello
        </Text>
      </View>
    <FloatingButton/>
    </Container>
  );
}
