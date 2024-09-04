import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ListRenderItem,
} from "react-native";
import { format, addDays, isSameDay, differenceInDays } from "date-fns";
import { FontAwesome5 } from "@expo/vector-icons";

const ITEM_WIDTH = 50;
const SCREEN_WIDTH = Dimensions.get("window").width;
const INITIAL_INDEX = 365;

interface CalendarItem {
  date: Date;
}

const InteractiveCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const flatListRef = useRef<FlatList<CalendarItem>>(null);

  const dates: CalendarItem[] = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 365 * 2 }, (_, i) => ({
      date: addDays(today, i - 365),
    }));
  }, []);

  const scrollToDate = useCallback((date: Date) => {
    const index = INITIAL_INDEX + differenceInDays(date, new Date());
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    scrollToDate(today);
  }, [scrollToDate]);

  const handleDatePress = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      requestAnimationFrame(() => {
        scrollToDate(date);
      });
    },
    [scrollToDate]
  );

  const renderItem: ListRenderItem<CalendarItem> = useCallback(
    ({ item }) => {
      const isSelected = isSameDay(item.date, selectedDate);
      const isToday = isSameDay(item.date, new Date());
      return (
        <TouchableOpacity
          onPress={() => handleDatePress(item.date)}
          className={`w-[50px] items-center p-1 ${
            isSelected ? "bg-gray-800 rounded-lg" : ""
          }`}
        >
          <Text
            className={`${
              isSelected
                ? "text-white font-bold"
                : isToday
                ? "text-blue-500 font-bold"
                : "text-white"
            } text-base`}
          >
            {format(item.date, "d")}
          </Text>
          <Text
            className={`${
              isSelected
                ? "text-white font-bold"
                : isToday
                ? "text-blue-500 font-bold"
                : "text-gray-400"
            } text-xs`}
          >
            {format(item.date, "EEE")}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedDate, handleDatePress]
  );

  return (
    <View className="w-full bg-gray-900 p-4 pt-8">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity className="p-2">
          <FontAwesome5 name="crown" size={24} color="gold" />
        </TouchableOpacity>
        <Text className="text-white text-xl">
          {format(selectedDate, "MMMM dd")}
        </Text>
        <TouchableOpacity
          onPress={goToToday}
          className="p-2 bg-blue-500 rounded-md"
        >
          <Text className="text-white">Today</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.date.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={INITIAL_INDEX}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
        }}
      />
    </View>
  );
};

export default InteractiveCalendar;
