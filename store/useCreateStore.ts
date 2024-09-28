import { create} from "zustand";

export type OptionType = "build" | "quit" | "goal" | "task";
export type TrackingOptionType = "dosDonts" | "amount" | "time";

interface StoreState {
  selectedOption: OptionType | null;
  selectedTrackingOption: TrackingOptionType | null;
  setSelectedOption: (option: OptionType) => void;
  setSelectedTrackingOption: (option: TrackingOptionType) => void;
  resetSelections: () => void;
}

const useCreateStore = create<StoreState>((set) => ({
  selectedOption: null,
  selectedTrackingOption: null,
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedTrackingOption: (option) =>
    set({ selectedTrackingOption: option }),
  resetSelections: () =>
    set({ selectedOption: null, selectedTrackingOption: null }),
}));

export default useCreateStore;
