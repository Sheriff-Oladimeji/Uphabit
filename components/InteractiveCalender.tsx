import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { format, addDays, subDays, isSameDay, differenceInDays } from "date-fns";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get('window').width;
const INITIAL_INDEX = 365; // Center of the 2-year range

const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const flatListRef = useRef<FlatList>(null);

  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 365 * 2 }, (_, i) => addDays(today, i - 365));
  }, []);

  const scrollToDate = useCallback((date: Date) => {
    const index = INITIAL_INDEX + differenceInDays(date, new Date());
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const renderItem = useCallback(({ item: date, index }: { item: Date; index: number }) => {
    const isSelected = isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(date);
          scrollToDate(date);
        }}
        style={{ width: ITEM_WIDTH, alignItems: 'center', padding: 5 }}
      >
        <Text
          className={`${
            isSelected
              ? "text-blue-500 font-bold text-lg"
              : isToday
              ? "text-green-500 font-bold text-lg"
              : "text-white text-base"
          }`}
        >
          {format(date, "d")}
        </Text>
        <Text
          className={`${
            isSelected ? "text-blue-500 font-bold" : 
            isToday ? "text-green-500 font-bold" :
            "text-white text-base"
          }`}
        >
          {format(date, "EEE")}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedDate]);

  return (
    <View className="w-full bg-gray-800 p-4 rounded-lg">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity 
          onPress={() => {
            const newDate = subDays(selectedDate, 7);
            setSelectedDate(newDate);
            scrollToDate(newDate);
          }} 
          className="p-2"
        >
          <Text className="text-white">Previous Week</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl">
          {format(selectedDate, "MMMM dd, yyyy")}
        </Text>
        <TouchableOpacity 
          onPress={() => {
            const newDate = addDays(selectedDate, 7);
            setSelectedDate(newDate);
            scrollToDate(newDate);
          }} 
          className="p-2"
        >
          <Text className="text-white">Next Week</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={INITIAL_INDEX}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{ paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2 }}
      />
    </View>
  );
};

export default InteractiveCalendar;
