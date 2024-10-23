import React from "react";
import { View, Modal, Platform, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addYears, subYears } from "date-fns";

interface CustomDateTimePickerProps {
  visible: boolean;
  value: Date;
  onChange: (event: any, date?: Date) => void;
  mode: "date" | "time";
  onClose: () => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({ visible, value, onChange, mode, onClose }) => {
  if (Platform.OS === "ios") {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.7)]">
          <View className="bg-gray-800 p-4 rounded-lg w-4/5">
            <DateTimePicker
              testID={`ios${mode === "date" ? "Date" : "Time"}Picker`}
              value={value}
              mode={mode}
              is24Hour={false}
              display="spinner"
              onChange={onChange}
              textColor="white"
              minimumDate={subYears(new Date(), 1)}
              maximumDate={addYears(new Date(), 1)}
            />
            <TouchableOpacity
              onPress={onClose}
              className="mt-4 bg-blue-500 p-2 rounded-full"
            >
              <Text className="text-white text-center">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else {
    return visible ? (
      <DateTimePicker
        testID={`android${mode === "date" ? "Date" : "Time"}Picker`}
        value={value}
        mode={mode}
        is24Hour={false}
        display="default"
        onChange={onChange}
        minimumDate={subYears(new Date(), 1)}
        maximumDate={addYears(new Date(), 1)}
      />
    ) : null;
  }
};

export default CustomDateTimePicker;
