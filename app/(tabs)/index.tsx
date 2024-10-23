import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "@/components/Container";
import { Alert, Text, View } from "react-native";
import FloatingButton from "@/components/FloatingButton";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import CreateHabit from "@/components/CreateHabit";
import Habits from "@/components/Habits";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handlePress = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };
  return (
    <Container>
      <View className="flex-1">
        <Habits />
      </View>
      <FloatingButton onPress={handlePress} />
      <CreateHabit isVisible={isModalVisible} onClose={handleClose} />
    </Container>
  );
}
