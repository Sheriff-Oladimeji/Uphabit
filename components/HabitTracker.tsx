import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { CategoryType } from "@/@types/habitTypes";
import {
  format,
  addDays,
  isToday,
  differenceInDays,
} from "date-fns";
import WeekDay from "./WeekDay"; // Add this import

interface HabitTrackerProps {
  id: string;
  name: string;
  category: CategoryType;
  onToggle: (date: string) => void;
  progress: Array<{ date: string; completed: boolean }>;
  streakGoal?: number | null;
  startDate: Date;
}

const getCategoryIcon = (
  category: CategoryType
): React.ComponentProps<typeof MaterialCommunityIcons>["name"] => {
  const icons: Record<
    CategoryType,
    React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  > = {
    sport: "basketball",
    health: "heart-pulse",
    work: "briefcase",
    finance: "cash",
    social: "account-group",
    fun: "gamepad-variant",
    other: "dots-horizontal",
  };
  return icons[category];
};

const DAY_WIDTH = 48;
const WINDOW_WIDTH = Dimensions.get("window").width;
const INITIAL_FUTURE_DAYS = 30; // Initial number of future days to show
const LOAD_MORE_THRESHOLD = 1000; // Pixels from the end to trigger loading more days

const HabitTracker: React.FC<HabitTrackerProps> = ({
  id,
  name,
  category,
  onToggle,
  progress,
  streakGoal,
  startDate,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [futureDays, setFutureDays] = useState(INITIAL_FUTURE_DAYS);
  const today = format(new Date(), 'yyyy-MM-dd');
  const isCompletedToday = progress.some(p => p.date === today && p.completed);

  // Generate dates based on streak goal or infinite scrolling
  const getDates = () => {
    if (streakGoal) {
      // For habits with streak goals, show exactly the needed days from start date
      return [...Array(streakGoal)].map((_, index) =>
        addDays(startDate, index)
      );
    } else {
      // For habits without streak goals, show all days from start date plus future days
      const daysFromStart = differenceInDays(new Date(), startDate);
      const totalDays = daysFromStart + futureDays;
      return [...Array(totalDays)].map((_, index) => addDays(startDate, index));
    }
  };

  const dates = getDates();

  // Handle scroll to load more future dates
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (streakGoal) return; // Don't load more for streak-based habits

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToEnd =
      layoutMeasurement.width + contentOffset.x >=
      contentSize.width - LOAD_MORE_THRESHOLD;

    if (isCloseToEnd) {
      setFutureDays((prev) => prev + 30); // Load 30 more days when near the end
    }
  };

  // Calculate current streak
  const sortedProgress = [...progress].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  let currentStreak = 0;
  for (const entry of sortedProgress) {
    if (entry.completed) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Initial scroll position
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current && isToday(today)) {
        const daysSinceStart = differenceInDays(today, startDate);
        const scrollPosition = daysSinceStart * DAY_WIDTH;

        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }
    }, 100);
  }, []);

  return (
    <View className="mb-6 p-4 rounded-xl bg-gray-900/80 border border-gray-800">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 rounded-full bg-gray-800 items-center justify-center mr-3">
            <MaterialCommunityIcons
              name={getCategoryIcon(category)}
              size={20}
              color="#fff"
            />
          </View>
          <View>
            <Text className="text-white text-lg font-semibold">{name}</Text>
            <Text className="text-gray-400 text-sm">
              {streakGoal
                ? `Streak: ${currentStreak} / ${streakGoal} days`
                : `Current streak: ${currentStreak} days`}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => onToggle(today)}
          className={`rounded-md p-2 ${
            isCompletedToday ? 'bg-green-500' : 'bg-gray-700'
          }`}
        >
          <AntDesign 
            name={isCompletedToday ? "check" : "plus"} 
            size={18} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Days View */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        decelerationRate="fast"
        snapToInterval={DAY_WIDTH}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {dates.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const isCompleted = progress.some(
            (p) => p.date === dateStr && p.completed
          );

          return (
            <WeekDay
              key={dateStr}
              date={date}
              isCompleted={isCompleted}
              onPress={() => {}} // Remove onPress functionality
              disabled={true} // Disable all WeekDay components
              startDate={startDate}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HabitTracker;
