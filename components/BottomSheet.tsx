import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { BottomSheetProps } from "@/@types/bottomSheet";

const BottomSheet = ({
  isVisible,
  onClose,
  children,
  radius,
  height,
  handler,
}: BottomSheetProps) => {
  const refRBSheet = useRef<any>(null);
  useEffect(() => {
    if (isVisible) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isVisible]);

  const handleClose = () => {
    onClose();
    if (handler) {
      handler();
    }
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressMask={true}
      onClose={handleClose}
      dragOnContent={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          flex: 1,
        },
        container: {
          backgroundColor: "#111827",
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          height: height,
        },
        draggableIcon: {
          backgroundColor: "#fff",
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: true,
      }}
    >
      {children}
    </RBSheet>
  );
};

export default BottomSheet;
