// @types/habitTypes.ts
export interface Habit {
  id: string;
  name: string;
  motivation: string;
  reminderTime: Date;
  repeatConfig: RepeatConfig;
  category: CategoryType;
}

export interface RepeatConfig {
  type: "daily" | "weekly" | "monthly";
  weekDays?: number[];
  monthDay?: number;
}

export type CategoryType =
  | "sport"
  | "health"
  | "work"
  | "finance"
  | "social"
  | "fun"
  | "other";
