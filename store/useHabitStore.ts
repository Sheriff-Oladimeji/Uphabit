import { create } from 'zustand';
import { getItem, storeItem } from '../utils/storage';

interface Habit {
  id: string;
  name: string;
  type: 'build' | 'quit';
  createdAt: string;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  loadHabits: () => Promise<void>;
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
}));

export default useHabitStore;
