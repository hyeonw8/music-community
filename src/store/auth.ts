import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  userId: string;
  setUserId: (userId: string) => void;
};

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isLogin: false,
      userId: "",
      login: () => set({ isLogin: true }),
      logout: () => set({ isLogin: false }),
      setUserId: (userId) => set({ userId })
    }),
    {
      name: "userIdStorage"
    }
  )
);

// export const useLoginStore = create<LoginState>(persist()(set) => ({
//   isLogin: false,
//   login: () => set({ isLogin: true }),
//   logout: () => set({ isLogin: false }),
//   userId: "",
//   setUserId: (userId) => set({ userId })
// }));
