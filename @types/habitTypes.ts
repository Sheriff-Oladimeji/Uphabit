// @types/habitTypes.ts
export interface Habit {
  id: string;
  name: string;
  motivation: string;
  reminderTime: Date;
  category: CategoryType;
  streakGoal: number | null; // null means indefinite/forever
  currentStreak: number;
  startDate: Date;
}

export type CategoryType =
  | "sport"
  | "health"
  | "work"
  | "finance"
  | "social"
  | "fun"
  | "other";
