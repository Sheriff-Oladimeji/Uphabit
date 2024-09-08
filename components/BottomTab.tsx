import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
interface Props {
  children: React.ReactNode;
  styles?: string;
}
const BottomTab = ({ children, styles }: Props) => {
  return (
    <View
      style={{
        gap: 10,
      }}
      className={`absolute bottom-0 left-0 right-0 py-3  flex  justify-center  items-center bg-darkBg ${styles}  `}
    >
      {children}
    </View>
  );
};

export default BottomTab;
