import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Habit {
  id: string;
  name: string;
  trackingType: string;
  amount?: number;
  time?: { hours: string; minutes: string; seconds: string };
}

interface HabitStoreState {
  habits: Habit[];
  addHabit: (habit: Habit) => Promise<void>;
  loadHabits: () => Promise<void>;
}

const useHabitStore = create<HabitStoreState>((set) => ({
  habits: [],
  addHabit: async (habit) => {
    set((state) => {
      const updatedHabits = [...state.habits, habit];
      AsyncStorage.setItem("habits", JSON.stringify(updatedHabits)); // Save to AsyncStorage
      return { habits: updatedHabits };
    });
  },
  loadHabits: async () => {
    const storedHabits = await AsyncStorage.getItem("habits");
    if (storedHabits) {
      set({ habits: JSON.parse(storedHabits) });
    }
  },
}));

export default useHabitStore;
