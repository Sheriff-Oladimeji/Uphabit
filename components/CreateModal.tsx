import React, { useState, useRef } from "react";
import { View } from "react-native";
import BottomSheet from "./BottomSheet";
import { BottomSheetProps } from "@/@types/bottomSheet";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FirstStep from "./FirstStep";

type ProgressStepsRef = {
  setActiveStep: (step: number) => void;
};

type OptionType = "build" | "quit" | "goal" | "task";

const CreateModal: React.FC<BottomSheetProps> = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const progressStepsRef = useRef<ProgressStepsRef | null>(null);

  const progressStepsStyle = {
    activeStepIconBorderColor: "#10B981",
    activeLabelColor: "#10B981",
    activeStepNumColor: "white",
    activeStepIconColor: "#10B981",
    completedStepIconColor: "#10B981",
    completedProgressBarColor: "#10B981",
    completedCheckColor: "#111827",
    labelColor: "#6B7280",
    labelFontSize: 12,
    topOffset: 20,
  };

  const progressStepStyle = {
    removeBtnRow: true,
    previousBtnDisabled: true,
    nextBtnDisabled: true,
    previousBtnText: "",
    nextBtnText: "",
  };

  const handleOptionSelect = (option: OptionType) => {
    if (progressStepsRef.current && currentStep < 2) {
      progressStepsRef.current.setActiveStep(currentStep + 1);
      setCurrentStep(currentStep + 1);
      // Here you can handle the selected option if needed
      console.log("Selected option:", option);
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      radius={10}
      height="99%"
    >
      <View style={{ flex: 1, backgroundColor: "#111827" }}>
        <ProgressSteps {...progressStepsStyle} ref={progressStepsRef}>
          <ProgressStep label="Want" {...progressStepStyle}>
            <FirstStep onOptionSelect={handleOptionSelect} />
          </ProgressStep>
          <ProgressStep label="How" {...progressStepStyle}>
            <View style={{ alignItems: "center" }}>
              {/* Content for step 2 */}
            </View>
          </ProgressStep>
          <ProgressStep label="Create" {...progressStepStyle}>
            <View style={{ alignItems: "center" }}>
              {/* Content for step 3 */}
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </BottomSheet>
  );
};

export default CreateModal;
