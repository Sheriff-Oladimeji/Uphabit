import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItem, storeItem } from "../utils/storage";
import { startOfDay, format } from "date-fns";
import {
  scheduleNotification,
  cancelNotification,
} from "../utils/notificationService";

export type RepeatFrequency = "daily" | "weekly" | "monthly";
export type TimeOfDay = "anytime" | "morning" | "afternoon" | "evening";
export type HabitType = "task" | "amount" | "duration"; // Keep this

// Removed the type for build or quit from the Habit interface
export interface Habit {
  id: string;
  name: string;
  habitType: HabitType; // Keep this
  startDate: string;
  createdAt: string;
  repeatFrequency: RepeatFrequency;
  timeOfDay: TimeOfDay;
  reminderTime: string;
  endDate: string | null;
  target?: number; // For amount and duration based habits
  unit?: string; // For amount and duration based habits (e.g., 'ml', 'mins')
  completionDates: Record<string, boolean>;
  progressDates: Record<string, number>;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, updatedHabit: Partial<Habit>) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  updateHabitProgress: (id: string, progress: number, date: Date) => void;
  loadHabits: () => Promise<void>;
  getHabitsForDate: (date: Date) => Habit[];
  saveHabits: () => Promise<void>;
  checkAllHabitsCompleted: () => void;
}

const sendCompletionNotification = () => {
  // Implementation of the notification logic
};

const useJunkStore = create<HabitStore>((set, get) => ({
  habits: [],
  addHabit: async (habit) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completionDates: {},
      progressDates: {},
    };
    const updatedHabits = [...get().habits, newHabit];
    await storeItem("habits", JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });

    // Schedule notification for the new habit
    await scheduleNotification(newHabit);
  },
  deleteHabit: async (id: string) => {
    const updatedHabits = get().habits.filter((habit) => habit.id !== id);
    await storeItem("habits", JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });

    // Cancel notification for the deleted habit
    await cancelNotification(id);
  },
  updateHabit: (id: string, updatedHabit: Partial<Habit>) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      ),
    }));
    get().saveHabits();
  },
  loadHabits: async () => {
    const storedHabits = await getItem("habits");
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      set({ habits: parsedHabits });
    }
  },
  getHabitsForDate: (date: Date) => {
    const startOfDayDate = startOfDay(date);
    return get().habits.filter((habit) => {
      const habitStartDate = startOfDay(new Date(habit.startDate));
      return habitStartDate <= startOfDayDate;
    });
  },
  updateHabitProgress: async (id: string, progress: number, date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const updatedHabits = get().habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            progressDates: {
              ...habit.progressDates,
              [dateKey]: progress,
            },
          }
        : habit
    );
    await storeItem("habits", JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  toggleHabitCompletion: async (id: string, date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const updatedHabits = get().habits.map((habit) => {
      if (habit.id === id) {
        const currentCompletionStatus =
          habit.completionDates?.[dateKey] ?? false;
        const currentProgress = habit.progressDates?.[dateKey] ?? 0;
        return {
          ...habit,
          completionDates: {
            ...habit.completionDates,
            [dateKey]: !currentCompletionStatus,
          },
          progressDates: {
            ...habit.progressDates,
            [dateKey]: currentCompletionStatus ? 0 : habit.target ?? 0,
          },
        };
      }
      return habit;
    });
    await storeItem("habits", JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });

    get().checkAllHabitsCompleted(); // Correctly accessing checkAllHabitsCompleted
  },
  saveHabits: async () => {
    await storeItem("habits", JSON.stringify(get().habits));
  },
  checkAllHabitsCompleted: () => {
    const allCompleted = get().habits.every((habit: Habit) => {
      const todayKey = format(new Date(), "yyyy-MM-dd");
      return habit.completionDates[todayKey] === true;
    });

    if (allCompleted) {
      console.log("All habits completed, sending notification."); // Debug log
      sendCompletionNotification(); // Ensure this is called
    }
  },
}));

export default useJunkStore;
