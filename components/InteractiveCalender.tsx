import React, { useRef, useCallback, useMemo, memo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ListRenderItem,
} from "react-native";
import { format, addDays, isSameDay, differenceInDays } from "date-fns";
import useDateStore from "@/store/useDateStore";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_COUNT = 365 * 2;
const ITEMS_TO_SHOW = 5;
const DAYS_TO_SCROLL = 2;

interface CalendarItem {
  date: Date;
  id: string;
}

const CalendarItemComponent = memo<{
  item: CalendarItem;
  isSelected: boolean;
  isToday: boolean;
  onPress: (date: Date) => void;
}>(({ item, isSelected, isToday, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(item.date)}
    className={`w-[60px] h-[70px] items-center justify-center rounded-xl mx-1 ${
      isSelected ? "bg-blue-500" : "bg-gray-800"
    }`}
  >
    <Text
      className={`${
        isSelected || isToday ? "text-white" : "text-gray-400"
      } text-lg font-bold mb-1`}
    >
      {format(item.date, "d")}
    </Text>
    <Text
      className={`${
        isSelected || isToday ? "text-white" : "text-gray-500"
      } text-xs`}
    >
      {format(item.date, "EEE")}
    </Text>
  </TouchableOpacity>
));

const InteractiveCalendar: React.FC = () => {
  const { currentDate, setCurrentDate } = useDateStore();
  const flatListRef = useRef<FlatList<CalendarItem>>(null);

  const dates: CalendarItem[] = useMemo(() => {
    const today = new Date();
    return Array.from({ length: ITEM_COUNT }, (_, i) => ({
      date: addDays(today, i - ITEM_COUNT / 2),
      id: `date-${i}`,
    }));
  }, []);

  const initialScrollIndex = useMemo(() => {
    return Math.floor(ITEM_COUNT / 2) + DAYS_TO_SCROLL;
  }, []);

  const scrollToDate = useCallback(
    (date: Date) => {
      const index =
        initialScrollIndex +
        differenceInDays(date, new Date()) -
        DAYS_TO_SCROLL;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    },
    [initialScrollIndex]
  );

  const handleDatePress = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      scrollToDate(date);
    },
    [setCurrentDate, scrollToDate]
  );

  const renderItem: ListRenderItem<CalendarItem> = useCallback(
    ({ item }) => (
      <CalendarItemComponent
        item={item}
        isSelected={isSameDay(item.date, currentDate)}
        isToday={isSameDay(item.date, new Date())}
        onPress={handleDatePress}
      />
    ),
    [currentDate, handleDatePress]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    []
  );

  useEffect(() => {
   
    setTimeout(() => {
      scrollToDate(addDays(new Date(), DAYS_TO_SCROLL));
    }, 100);
  }, [scrollToDate]);

  return (
    <View className="w-full bg-gray-900 mt-4">
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={ITEMS_TO_SHOW}
        updateCellsBatchingPeriod={50}
        windowSize={ITEMS_TO_SHOW}
        initialNumToRender={ITEMS_TO_SHOW}
      />
    </View>
  );
};

export default memo(InteractiveCalendar);
