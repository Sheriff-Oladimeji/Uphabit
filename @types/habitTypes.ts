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
  progress: HabitProgress[]; // Ensure this is correctly defined
}

export type CategoryType =
  | "sport"
  | "health"
  | "work"
  | "finance"
  | "social"
  | "fun"
  | "other";

export interface HabitProgress {
  date: Date;
  completed: boolean;
}
