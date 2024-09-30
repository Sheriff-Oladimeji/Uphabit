import { create } from "zustand";

export type OptionType = "build" | "quit" | "goal" | "task";
export type TrackingOptionType = "dosDonts" | "amount" | "time";

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000); // Add 10 minutes
};

interface StoreState {
  selectedOption: OptionType | null;
  selectedTrackingOption: TrackingOptionType | null;
  reminderTime: Date;
  startDate: Date; // New state for start date
  setSelectedOption: (option: OptionType) => void;
  setSelectedTrackingOption: (option: TrackingOptionType) => void;
  setReminderTime: (time: Date) => void;
  setStartDate: (date: Date) => void; // New method to set start date
  resetSelections: () => void;
}

const useCreateStore = create<StoreState>((set) => ({
  selectedOption: null,
  selectedTrackingOption: null,
  reminderTime: getDefaultReminderTime(), // Ensure this is a valid Date
  startDate: new Date(), // Initialize start date to current date
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedTrackingOption: (option) =>
    set({ selectedTrackingOption: option }),
  setReminderTime: (time) => set({ reminderTime: time }),
  setStartDate: (date) => set({ startDate: date }), // Implement the method to set start date
  resetSelections: () =>
    set({
      selectedOption: null,
      selectedTrackingOption: null,
      reminderTime: getDefaultReminderTime(), // Ensure this is a valid Date
      startDate: new Date(), // Reset start date to current date
    }),
}));

export default useCreateStore;
