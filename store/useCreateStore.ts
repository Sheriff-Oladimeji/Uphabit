import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "@/@types/habitTypes";
import { CategoryType } from "../components/CategoryBottomSheet";

interface StoreState {
  habits: Habit[];
  reminderTime: Date;
  motivation: string;
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
  setMotivation: (motivation: string) => void;
  setReminderTime: (time: Date) => void;
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
  category: "other",
  reminderTime: getDefaultReminderTime(),
  setCategory: (category) => set({ category }),
  setMotivation: (motivation) => set({ motivation }),
  setReminderTime: (time) => set({ reminderTime: time }),
 
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
