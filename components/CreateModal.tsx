import React, { useState, useRef } from "react";
import { View } from "react-native";
import BottomSheet from "./BottomSheet";
import { BottomSheetProps } from "@/@types/bottomSheet";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FirstStep from "./FirstStep";
import SecondStep, { TrackingOptionType } from "./SecondStep";

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
    labelColor: "#9CA3AF",
    labelFontSize: 16,
    topOffset: 20,
    progressBarColor: "#374151",
    disabledStepIconColor: "#374151",
  };

  const progressStepStyle = {
    removeBtnRow: true,
    previousBtnDisabled: true,
    nextBtnDisabled: true,
    previousBtnText: "",
    nextBtnText: "",
  };

  const handleFirstStepSelect = (option: OptionType) => {
    if (progressStepsRef.current && currentStep < 2) {
      progressStepsRef.current.setActiveStep(currentStep + 1);
      setCurrentStep(currentStep + 1);
      console.log("Selected option:", option);
    }
  };

  const handleSecondStepSelect = (option: TrackingOptionType) => {
    if (progressStepsRef.current && currentStep < 2) {
      progressStepsRef.current.setActiveStep(currentStep + 1);
      setCurrentStep(currentStep + 1);
      console.log("Selected tracking option:", option);
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
        <ProgressSteps
          {...progressStepsStyle}
          ref={progressStepsRef}
          activeStep={currentStep}
        >
          <ProgressStep
            label="Want"
            {...progressStepStyle}
            removeBtnRow={true}
          />
          <ProgressStep
            label="How"
            {...progressStepStyle}
            removeBtnRow={true}
          />
          <ProgressStep
            label="Info"
            {...progressStepStyle}
            removeBtnRow={true}
          />
        </ProgressSteps>
        {currentStep === 0 && (
          <FirstStep onOptionSelect={handleFirstStepSelect} />
        )}
        {currentStep === 1 && (
          <SecondStep onOptionSelect={handleSecondStepSelect} />
        )}
        {currentStep === 2 && (
          <View style={{ alignItems: "center" }}>
            {/* Content for step 3 */}
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default CreateModal;
