import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DateState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

// Custom storage object that always returns null for getItem
const customStorage = {
  getItem: (): null => null,
  setItem: (): void => {},
  removeItem: (): void => {},
};

const useDateStore = create<DateState>()(
  persist(
    (set) => ({
      currentDate: new Date(),
      setCurrentDate: (date: Date) => set({ currentDate: date }),
    }),
    {
      name: "date-storage",
      storage: createJSONStorage(() => customStorage),
      // This function determines if the state should be persisted
      partialize: (state) => ({}),
    }
  )
);

export default useDateStore;
