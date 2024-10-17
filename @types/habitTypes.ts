// types.ts

export type RepeatType = "daily" | "weekly" | "monthly";

export interface RepeatConfig {
  type: RepeatType;
  weekDays?: number[];
  monthDay?: number;
}

export interface Habit {
  id: string;
  name: string;
  motivation?: string;
  reminderTime: Date;
  repeatConfig: RepeatConfig;
}

export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  height?: string | number;
  radius?: number;
}

export interface RepeatBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  repeatConfig: RepeatConfig;
  setRepeatConfig: (config: RepeatConfig) => void;
}
