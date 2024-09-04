import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { format, addDays, isSameDay, differenceInDays } from "date-fns";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get('window').width;
const INITIAL_INDEX = 365; 

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

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    scrollToDate(today);
  }, [scrollToDate]);

  const renderItem = useCallback(({ item: date }: { item: Date }) => {
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
  }, [selectedDate, scrollToDate]);

  return (
    <View className="w-full bg-gray-800 p-4 rounded-lg">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => {
           
          }}
          className="p-2"
        >
          <FontAwesome5 name="crown" size={24} color="gold" />
        </TouchableOpacity>
        <Text className="text-white text-xl">
          {format(selectedDate, "MMMM dd, yyyy")}
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
        keyExtractor={(item) => item.toISOString()}
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
