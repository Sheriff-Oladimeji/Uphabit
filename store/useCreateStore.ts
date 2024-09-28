import { create } from "zustand";

export type OptionType = "build" | "quit" | "goal" | "task";
export type TrackingOptionType = "dosDonts" | "amount" | "time";

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000); // Add 10 minutes (60000 milliseconds = 1 minute)
};

interface StoreState {
  selectedOption: OptionType | null;
  selectedTrackingOption: TrackingOptionType | null;
  reminderTime: Date;
  setSelectedOption: (option: OptionType) => void;
  setSelectedTrackingOption: (option: TrackingOptionType) => void;
  setReminderTime: (time: Date) => void;
  resetSelections: () => void;
}

const useCreateStore = create<StoreState>((set) => ({
  selectedOption: null,
  selectedTrackingOption: null,
  reminderTime: getDefaultReminderTime(),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedTrackingOption: (option) =>
    set({ selectedTrackingOption: option }),
  setReminderTime: (time) => set({ reminderTime: time }),
  resetSelections: () =>
    set({
      selectedOption: null,
      selectedTrackingOption: null,
      reminderTime: getDefaultReminderTime(),
    }),
}));

export default useCreateStore;
