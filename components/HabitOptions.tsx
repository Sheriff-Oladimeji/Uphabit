import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { BottomSheetProps, HabitOptionProps } from "@/types/bottomSheet";
import BottomSheet from "./BottomSheet";

const HabitOptions = ({ isVisible, onClose , onDelete, onEdit, name}: HabitOptionProps) => {

  return (
      <BottomSheet isVisible={isVisible} onClose={onClose} radius={25}>
          <Text className="text-white font-bold  text-center text-xl">
              {name}
       </Text>
        
    </BottomSheet>
  );
};

export default HabitOptions;
