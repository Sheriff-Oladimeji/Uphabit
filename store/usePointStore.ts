import { create } from "zustand";
interface Point {
  points: number;
  incrementPoint: (point: number) => void;
  decrementPoint: (point: number) => void;
}

const usePointStore = create<Point>((set, get) => ({
    points: 0,
    incrementPoint: (point) => set((state) => ({ points: state.points + point })),
    decrementPoint: (point) => set((state) => ({points: state.points - point}))
   

    
}))

export default usePointStore