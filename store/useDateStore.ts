import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DateState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}


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
      
      partialize: (state) => ({}),
    }
  )
);

export default useDateStore;
