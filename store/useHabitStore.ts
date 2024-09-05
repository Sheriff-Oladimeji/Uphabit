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
    console.log('Habit added:', newHabit);
  },
  loadHabits: async () => {
    const storedHabits = await getItem('habits');
    console.log('Stored habits:', storedHabits);
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      console.log('Parsed habits:', parsedHabits);
      set({ habits: parsedHabits });
    }
  },
}));

export default useHabitStore;
