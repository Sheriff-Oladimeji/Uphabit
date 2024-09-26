import { View, Text } from "react-native";
import React from "react";
import BottomSheet from "./BottomSheet";
import { BottomSheetProps, HabitOptionProps } from "@/@types/bottomSheet";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
const CreateModal = ({ isVisible, onClose }: BottomSheetProps) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={10}
      height="99%"
    >
      <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep label="First Step">
            <View style={{ alignItems: "center" }}>
              <Text className="text-white">
                This is the content within step 1!
              </Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Second Step">
            <View style={{ alignItems: "center" }}>
              <Text className="text-white">
                This is the content within step 2!
              </Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Third Step">
            <View style={{ alignItems: "center" }}>
              <Text className="text-white">
                This is the content within step 3!
              </Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </BottomSheet>
  );
};

export default CreateModal;
