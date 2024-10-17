// store/useCreateStore.ts

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit, RepeatConfig } from "@/@types/habitTypes";
interface StoreState {
  habits: Habit[];
  reminderTime: Date;
  repeatConfig: RepeatConfig;
  motivation: string;
  setMotivation: (motivation: string) => void;
  setReminderTime: (time: Date) => void;
  setRepeatConfig: (config: RepeatConfig) => void;
  addHabit: (habit: Habit) => Promise<void>;
  loadHabits: () => Promise<void>;
}

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000);
};

const useCreateStore = create<StoreState>((set) => ({
  habits: [],
  motivation: "",
  reminderTime: getDefaultReminderTime(),
  repeatConfig: { type: "daily" },
  setMotivation: (motivation) => set({ motivation }),
  setReminderTime: (time) => set({ reminderTime: time }),
  setRepeatConfig: (config) => set({ repeatConfig: config }),
  addHabit: async (habit) => {
    set((state) => {
      const updatedHabits = [...state.habits, habit];
      AsyncStorage.setItem("habits", JSON.stringify(updatedHabits));
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

export default useCreateStore;
