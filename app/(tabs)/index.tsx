import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Container from "@/components/Container";
import { Alert, Text, View } from "react-native";
import FloatingButton from "@/components/FloatingButton";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import CreateHabit from "@/components/CreateHabit";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handlePress = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false)
  }
  return (
    <Container>
      <View>
        <Text className="text-white text-3xl font-bold  text-center">
          Hello
        </Text>
      </View>
      <FloatingButton onPress={handlePress} />
      <CreateHabit isVisible={isModalVisible}  onClose={handleClose} />
    </Container>
  );
}
