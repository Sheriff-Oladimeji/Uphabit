import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

type CreateHabitModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onCreateHabit: (type: "break" | "build") => void;
};

export function CreateHabitModal({
  isVisible,
  onClose,
  onCreateHabit,
}: CreateHabitModalProps) {
  const refRBSheet = useRef<any>(null);

  
  React.useEffect(() => {
    if (isVisible) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isVisible]);

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressMask={true}
      onClose={onClose}
      height={350}
      draggable={true}
      dragOnContent={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
        },
        container: {
          backgroundColor: "#1f2937", 
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        draggableIcon: {
          backgroundColor: "#fff",
        },
      }}
    >
      <View className="p-5 items-center w-full pb-8">
        <Text className="text-xl font-bold text-white text-center mb-5">
          What type of a habit?
        </Text>
        {/* Build Habit Button */}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg mb-4 w-full"
          onPress={() => onCreateHabit("build")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Build</Text>
          <Text className="text-sm text-white">
            Start a positive routine, like meditating, coding daily, or eating
            healthier.
          </Text>
        </TouchableOpacity>

        {/* Break Habit Button */}
        <TouchableOpacity
          className="bg-red-600 p-4 rounded-lg w-full"
          onPress={() => onCreateHabit("break")}
        >
          <Text className="text-lg font-semibold text-white mb-2">Quit</Text>
          <Text className="text-sm text-red-100">
            Break free from a negative pattern, like procrastination,
            overthinking, or binge-watching.
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
}
