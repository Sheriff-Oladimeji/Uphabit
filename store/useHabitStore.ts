import { create } from 'zustand';
import { getItem, storeItem } from '../utils/storage';
import { startOfDay } from 'date-fns';

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly';
export type TimeOfDay = 'anytime' | 'morning' | 'afternoon' | 'evening';
export type HabitType = 'task' | 'amount' | 'duration';

interface Habit {
  id: string;
  name: string;
  type: 'build' | 'quit';
  habitType: HabitType;
  startDate: string;
  createdAt: string;
  repeatFrequency: RepeatFrequency;
  timeOfDay: TimeOfDay;
  reminderTime: string;
  endDate: string | null;
  target?: number; // For amount and duration based habits
  unit?: string; // For amount and duration based habits (e.g., 'ml', 'mins')
  progress?: number;
  timeElapsed?: number;
  isCompleted: boolean; // Add this line
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  loadHabits: () => Promise<void>;
  getHabitsForDate: (date: Date) => Habit[];
  updateHabitProgress: (id: string, progress: number) => Promise<void>;
  toggleHabitCompletion: (id: string) => Promise<void>;
}

const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  addHabit: async (habit) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedHabits = [...get().habits, newHabit];
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  deleteHabit: async (id: string) => {
    const updatedHabits = get().habits.filter(habit => habit.id !== id);
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  loadHabits: async () => {
    const storedHabits = await getItem('habits');
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      set({ habits: parsedHabits });
    }
  },
  getHabitsForDate: (date: Date) => {
    const startOfDayDate = startOfDay(date);
    return get().habits.filter(habit => {
      const habitStartDate = startOfDay(new Date(habit.startDate));
      return habitStartDate <= startOfDayDate;
    });
  },
  updateHabitProgress: async (id: string, progress: number) => {
    const updatedHabits = get().habits.map(habit =>
      habit.id === id
        ? {
            ...habit,
            progress: habit.habitType === 'amount' ? progress : habit.progress,
            timeElapsed: habit.habitType === 'duration' ? progress : habit.timeElapsed,
          }
        : habit
    );
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  toggleHabitCompletion: async (id: string) => {
    const updatedHabits = get().habits.map(habit =>
      habit.id === id
        ? {
            ...habit,
            isCompleted: !habit.isCompleted,
            progress: habit.habitType === 'amount' ? (habit.isCompleted ? 0 : habit.target) : habit.progress,
            timeElapsed: habit.habitType === 'duration' ? (habit.isCompleted ? 0 : habit.target) : habit.timeElapsed,
          }
        : habit
    );
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
}));

export default useHabitStore;
