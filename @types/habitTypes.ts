// @types/habitTypes.ts
export interface Habit {
  id: string;
  name: string;
  motivation: string;
  reminderTime: Date;
  category: CategoryType;
}



export type CategoryType =
  | "sport"
  | "health"
  | "work"
  | "finance"
  | "social"
  | "fun"
  | "other";
