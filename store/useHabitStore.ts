import { create } from 'zustand';
import { getItem, storeItem } from '../utils/storage';
import { startOfDay, format } from 'date-fns';

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly';
export type TimeOfDay = 'anytime' | 'morning' | 'afternoon' | 'evening';
export type HabitType = 'task' | 'amount' | 'duration';

export interface Habit {
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
  completionDates: Record<string, boolean>;
  progressDates: Record<string, number>;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completionDates' | 'progressDates'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  loadHabits: () => Promise<void>;
  getHabitsForDate: (date: Date) => Habit[];
  updateHabitProgress: (id: string, progress: number, date: Date) => Promise<void>;
  toggleHabitCompletion: (id: string, date: Date) => Promise<void>;
}

const useHabitStore = create<HabitStore>((set, get) => ({
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
  updateHabitProgress: async (id: string, progress: number, date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const updatedHabits = get().habits.map(habit =>
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
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  toggleHabitCompletion: async (id: string, date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const updatedHabits = get().habits.map(habit => {
      if (habit.id === id) {
        const currentCompletionStatus = habit.completionDates?.[dateKey] ?? false;
        const currentProgress = habit.progressDates?.[dateKey] ?? 0;
        return {
          ...habit,
          completionDates: {
            ...habit.completionDates,
            [dateKey]: !currentCompletionStatus,
          },
          progressDates: {
            ...habit.progressDates,
            [dateKey]: currentCompletionStatus ? 0 : (habit.target ?? 0),
          },
        };
      }
      return habit;
    });
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
}));

export default useHabitStore;
