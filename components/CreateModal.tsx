import React, { useState, useRef } from "react";
import { ScrollView, View } from "react-native";
import BottomSheet from "./BottomSheet";
import { BottomSheetProps } from "@/@types/bottomSheet";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FirstStep from "./FirstStep";
import SecondStep, { TrackingOptionType } from "./SecondStep";

import CreateGoal from "./CreateGoal";
import CreateTodo from "./CreateTodo";
import CreateNewHabit from "./CreateNewHabit";
import useCreateStore from "@/store/useCreateStore";
type ProgressStepsRef = {
  setActiveStep: (step: number) => void;
};

type OptionType = "build" | "quit" | "goal" | "task";

const CreateModal: React.FC<BottomSheetProps> = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  // const [selectedTrackingOption, setSelectedTrackingOption] =
  //   useState<TrackingOptionType | null>(null);
  const progressStepsRef = useRef<ProgressStepsRef | null>(null);

const {
  selectedOption,
  selectedTrackingOption,
  setSelectedOption,
  setSelectedTrackingOption,
  resetSelections,
} = useCreateStore();
  // Reset state when modal is closed
  const handleClose = () => {
    resetSelections(); // Reset selections in the store
    setCurrentStep(0);
    onClose();
  };

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
    setSelectedOption(option); // Store the selected option in Zustand
    if (progressStepsRef.current && currentStep < 2) {
      progressStepsRef.current.setActiveStep(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSecondStepSelect = (option: TrackingOptionType) => {
    setSelectedTrackingOption(option); // Store the selected tracking option in Zustand
    if (progressStepsRef.current && currentStep < 2) {
      progressStepsRef.current.setActiveStep(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={handleClose} // Use the new handleClose function
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
          <ScrollView
            className="w-full"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
          >
            {selectedOption === "build" || selectedOption === "quit" ? (
              <CreateNewHabit />
            ) : selectedOption === "goal" ? (
              <CreateGoal />
            ) : selectedOption === "task" ? (
              <CreateTodo />
            ) : null}
          </ScrollView>
        )}
      </View>
    </BottomSheet>
  );
};

export default CreateModal;
