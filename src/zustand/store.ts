import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//
interface IState {
  count: number;
  increase: (num: number) => void;
  reset: () => void;
}

export const useCountStore = create<IState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increase: (num) => set((state) => ({ count: state.count + num })),
        reset: () => set(() => ({ count: 0 })),
      }),
      {
        name: "count-storage",
      }
    )
  )
);
