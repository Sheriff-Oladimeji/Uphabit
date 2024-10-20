import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoryType } from "@/@types/habitTypes";

interface HabitProgress {
  date: string; // ISO string
  completed: boolean;
}

interface Habit {
  id: string;
  name: string;
  motivation: string;
  reminderTime: Date;
  category: CategoryType;
  streakGoal: number | null;
  currentStreak: number;
  startDate: Date;
  progress: HabitProgress[];
}

interface StoreState {
  habits: Habit[];
  reminderTime: Date;
  motivation: string;
  category: CategoryType;
  streakGoal: number | null;
  setStreakGoal: (goal: number | null) => void;
  setCategory: (category: CategoryType) => void;
  setMotivation: (motivation: string) => void;
  setReminderTime: (time: Date) => void;
  addHabit: (habit: Habit) => Promise<void>;
  loadHabits: () => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  getHabitProgress: (habitId: string) => HabitProgress[];
}

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000);
};

const useCreateStore = create<StoreState>((set, get) => ({
  habits: [],
  motivation: "",
  category: "other",
  reminderTime: getDefaultReminderTime(),
  streakGoal: null,

  setStreakGoal: (goal) => set({ streakGoal: goal }),
  setCategory: (category) => set({ category }),
  setMotivation: (motivation) => set({ motivation }),
  setReminderTime: (time) => set({ reminderTime: time }),

  addHabit: async (habit) => {
    set((state) => {
      const newHabit = {
        ...habit,
        currentStreak: 0,
        startDate: new Date(),
        progress: [],
      };
      const updatedHabits = [...state.habits, newHabit];
      AsyncStorage.setItem("streaks", JSON.stringify(updatedHabits));
      return { habits: updatedHabits };
    });
  },

  loadHabits: async () => {
    const storedHabits = await AsyncStorage.getItem("streaks");
    if (storedHabits) {
      set({ habits: JSON.parse(storedHabits) });
    }
  },

  toggleHabitCompletion: async (habitId: string, date: string) => {
    set((state) => {
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === habitId) {
          const existingProgress = habit.progress.find((p) => p.date === date);
          let newProgress;
          if (existingProgress) {
            newProgress = habit.progress.map((p) =>
              p.date === date ? { ...p, completed: !p.completed } : p
            );
          } else {
            newProgress = [...habit.progress, { date, completed: true }];
          }
          return {
            ...habit,
            progress: newProgress,
          };
        }
        return habit;
      });
      AsyncStorage.setItem("streaks", JSON.stringify(updatedHabits));
      return { habits: updatedHabits };
    });
  },

  getHabitProgress: (habitId: string) => {
    const habit = get().habits.find((h) => h.id === habitId);
    return habit?.progress || [];
  },
}));

export default useCreateStore;
