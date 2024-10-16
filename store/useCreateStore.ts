import { create } from "zustand";

export type OptionType = "build" | "quit" | "goal"   ;
export type TrackingOptionType = "dosDonts" | "amount" | "time";
export type RepeatType = "daily" | "weekly" | "monthly";

interface RepeatConfig {
  type: RepeatType;
  weekDays?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  monthDay?: number; // 1-31
}

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000); // Add 10 minutes
};

interface StoreState {
  selectedOption: OptionType | null;
  selectedTrackingOption: TrackingOptionType | null;
  reminderTime: Date;
  startDate: Date;
  repeatConfig: RepeatConfig;
  setSelectedOption: (option: OptionType) => void;
  setSelectedTrackingOption: (option: TrackingOptionType) => void;
  setReminderTime: (time: Date) => void;
  setStartDate: (date: Date) => void;
  setRepeatConfig: (config: RepeatConfig) => void;
  resetSelections: () => void;
}

const useCreateStore = create<StoreState>((set) => ({
  selectedOption: null,
  selectedTrackingOption: null,
  reminderTime: getDefaultReminderTime(),
  startDate: new Date(),
  repeatConfig: { type: "daily" },
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedTrackingOption: (option) =>
    set({ selectedTrackingOption: option }),
  setReminderTime: (time) => set({ reminderTime: time }),
  setStartDate: (date) => set({ startDate: date }),
  setRepeatConfig: (config) => set({ repeatConfig: config }),
  resetSelections: () =>
    set({
      selectedOption: null,
      selectedTrackingOption: null,
      reminderTime: getDefaultReminderTime(),
      startDate: new Date(),
      repeatConfig: { type: "daily" },
    }),
}));

export default useCreateStore;
